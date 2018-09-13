import io from "socket.io-client";

export const TOOL_PENCIL = 'pencil';
// eksportowana metoda odpowiedzialna za rysowanie ołówkiem po tablicy
export default (context) => {

  let stroke = null;
  // funkcja rozpoczynająca rysowanie reaguje na wciśnięcie lewego klawisza myszy
  const onMouseDown = (x, y, color, size) => {
    // element przechowujący informacje o rysowanej krzywej
    stroke = {
      id: v4(),
      tool: TOOL_PENCIL,
      color,
      size,
      points: [{x, y}]
    };
    return [stroke];
  };

  // funkcja ta odpowiada za rysowanie linni na canvasie
  // matoda jest wywoływana podczas każdego zarejestowanego ruchu
  const drawLine = (item, start, {x, y}) => {
    // 1. zapisujemy obecny stan tablicy
    // 2. lineJoin i lineCap ustawia zaokrąglanie krwędzi podczas łamania i końca linni
    // 3. beginPath zaczyna rysowanie
    // 4. ustawiamy grubość linni oraz kolor
    // 5. ustawiamy typ łączenia się rysowanych elementów
    //    source-over oznacza że najnowsza linnia bedzię zasłaniała pozostałe
    // 6. zaczynamy rysować linnie od punktu początkowego do punktu końcowego
    // 7. kończymy rysowanie i zapisujemy tablice
    context.save();
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.beginPath();
    context.lineWidth = item.size;
    context.strokeStyle = item.color;
    context.globalCompositeOperation = 'source-over';
    context.moveTo(start.x, start.y);
    context.lineTo(x, y);
    context.closePath();
    context.stroke();
    context.restore();
  };

  //funkcja reagująca na ruch myszy
  const onMouseMove = (x, y) => {
    if (!stroke) return [];
    // 1. zapisujemy nowe położenie myszy
    // 2. pobieramy ostatni zapisany punkt z tablicy wszystkich punktów
    // 3. rysujemy linnie
    // 4. dodajemy nowy punkt do tablicy punktów
    // 5. zwracamy nowe informacje o naszej krzywej
    const newPoint = {x, y};
    const start = stroke.points.slice(-1)[0];
    drawLine(stroke, start, newPoint);
    stroke.points.push(newPoint);
    points.push(newPoint);

    return [stroke];
  };

  // metoda kończąca rysowanie linni która zwraca i resetuje tablicę punków
  const onMouseUp = (x, y) => {
    if (!stroke) return;
    onMouseMove(x, y);
    const item = stroke;
    stroke = null;
    return [item];
  };

  // funkcja która rysuje stopniowo w czasie dzięki czemu
  // otrzymujemy efekt rysowania na żywo
  const draw = (item, animate) => {
    let time = 0;
    let i = 0;
    const j = item.points.length;
    // iterujemy po tablicy punktów i rysujemy kolejne linnie w odstępie 10 milisekund
    for (i, j; i < j; i++) {
      if (!item.points[i - 1]) continue;
      if (animate) {
        setTimeout(drawLine.bind(null, item, item.points[i - 1], item.points[i]), time);
        time += 10;
      } else {
        drawLine(item, item.points[i - 1], item.points[i]);
      }
    }
  };

  return {
    onMouseDown,
    onMouseMove,
    onDebouncedMouseMove,
    onMouseUp,
    draw,
  };
};


// importujemy potrzebne klasy reacta i wszystkie narzędzia
import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom'
import {Pencil, TOOL_PENCIL, Line, TOOL_LINE, Ellipse, TOOL_ELLIPSE, Rectangle, TOOL_RECTANGLE} from './tools'
import Fade from "react-reveal/Fade";
import {Icon} from "react-icons-kit";

// mapujemy do obiektu wszystkie typy narzędzi
export const toolsMap = {
  [TOOL_PENCIL]: Pencil,
  [TOOL_LINE]: Line,
  [TOOL_RECTANGLE]: Rectangle,
  [TOOL_ELLIPSE]: Ellipse
};

// tworzymy komponent Reacta
export default class SketchPad extends Component {
  tool = null;
  // propTypes jest narzędziem udostępnianym przez Reacta, pozwala nam zdefiniować typ dla wartości
  // w czystym JavaScript zmienne to jedynie kontenery które mogą przyjmować każdy typ
  // funkcjonalności poszczególnych zmiennych wyjaśnię niżej podczas ich użycia
  static propTypes = {
    items: PropTypes.array.isRequired,
    animate: PropTypes.bool,
    canvasClassName: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number,
    tool: PropTypes.string,
    toolsMap: PropTypes.object,
    onCompleteItem: PropTypes.func,
  };

  // utawiamy standardowe wartości dla naszego canvasa czyli
  // kolor, rozmiar narzędzia, nazwa clasy, jakiś czas, czy rysowanie ma być animowane,
  // domyślne narzędzie, oraz tablicę narzędzi
  static defaultProps = {
    color: '#000',
    size: 5,
    canvasClassName: 'canvas',
    debounceTime: 1000,
    animate: true,
    tool: TOOL_PENCIL,
    toolsMap
  };

  // konstruujemt nasz komponent
  constructor(props) {
    super(props);
    // bindowanie funkcji nadaje jej dostęp do obiektu this
    this.initTool = this.initTool.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  // metoda ta wykonywana jest tuż po wyrenderowaniu elementu
  // pobiera canvas do zmiennej i tworzy dwuwymiarowy kontekst renderowania tablicy
  // dodatkowo initializuje domyślne narzędzie do rysowania
  componentDidMount() {
    this.canvas = findDOMNode(this.canvasRef);
    this.ctx = this.canvas.getContext('2d');
    this.initTool(this.props.tool);
  }

  // motoda wykonywana podczas odświeżenia elementu props
  // zmienna items przekazywana jest z komponentu rodzica i jest
  // tablicą rysowanyych objektów pobranych przez websockety
  // które zostają narysowane
  componentWillReceiveProps({tool, items}) {
    items
      .filter(item => this.props.items.indexOf(item) === -1)
      .forEach(item => {
        this.initTool(item.tool);
        this.tool.draw(item, this.props.animate);
      });
    this.initTool(tool);
  }

  // pod zmienną tool podstawiamy wyżej omówioną metodę narzędzia "ołówek"
  initTool(tool) {
    this.tool = this.props.toolsMap[tool](this.ctx);
  }

  // metoda reaguje na rozpoczęcie rysowania
  onMouseDown(e) {
    // wywołujemy tą samą funkcje z urzywanego narzędzia
    this.tool.onMouseDown(...this.getCursorPosition(e), this.props.color, this.props.size, this.props.fillColor);
  }

  // metoda reagująca na ruch zachowuje się tak samo
  onMouseMove(e) {
    this.tool.onMouseMove(...this.getCursorPosition(e));
  }

  // w metodzie kończącej rysowanie również używamy funkcji narzedzia jak i zapisujemy dane do funkcji
  // onCompleteItem z której w komponecie rodzica pobieramy dane i wysyłame websocketem na serwer
  onMouseUp(e) {
    const data = this.tool.onMouseUp(...this.getCursorPosition(e));
    data && data[0] && this.props.onCompleteItem && this.props.onCompleteItem.apply(null, data);
  }

  // metoda pobiera aktualne położenie kursora
  getCursorPosition(e) {
    const {top, left} = this.canvas.getBoundingClientRect();
    return [
      e.clientX - left,
      e.clientY - top
    ];
  }

  // pozostało tylko wyrenderowanie tablicy
  render() {
    const {canvasClassName} = this.props;
    return (
      <canvas
        width={window.innerWidth * (10 / 12) - 20}
        height={window.innerHeight * 60 / 100}
        ref={(canvas) => {
          this.canvasRef = canvas;
        }}
        className={canvasClassName}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseOut={this.onMouseUp}
        onMouseUp={this.onMouseUp}
      />
    )
  }
}


// łączymy się z socketem
const socket = io('http://adres serwera');

export default class SketchPad extends Component {

  constructor(props) {
    super(props);

    // ustawiamy opcje naszego canvasa
    this.state = {
      tool: TOOL_PENCIL,
      size: 2,
      color: '#000000',
      items: [],
      join: false
    }
  }

  // łączymy się z pokojem i pobieramy websocketami tablice narysowanych już obiektów z serwera
  componentDidMount() {
    if (!this.state.join) {
      socket.emit('join', this.props.room);
      this.setState({join: true});
    }
    socket.on('add-item', item => {
      this.setState({items: this.state.items.concat([item])})
    });
  }

  render() {
    const {tool, size, color, items} = this.state;
    return (
      <div style={{textAlign: "center"}}>
        <div className='row'>
          {/* kontener paska narzędzi */}
          <div className='col-md-1'>
            <Fade left>
              <div className='tool-box'>
                <div className='tools' style={{textAlign: 'center'}}>
                  <div
                    {/* jeżeli dane narzędzie jest aktywne zmienia kolor */}
                    style={tool == TOOL_PENCIL ? {color: '#C96218', margin: "auto"} : {color: '#fff', margin: "auto"}}>
                    <Icon size={32} icon={pencil} onClick={() => this.setState({tool: TOOL_PENCIL})}/></div>
                  <div style={tool == TOOL_LINE ? {color: '#C96218', margin: "auto"} : {color: '#fff', margin: "auto"}}>
                    <Icon size={32} icon={minus} onClick={() => this.setState({tool: TOOL_LINE})}/></div>
                  <div
                    style={tool == TOOL_ELLIPSE ? {color: '#C96218', margin: "auto"} : {color: '#fff', margin: "auto"}}>
                    <Icon size={32} icon={circleO} onClick={() => this.setState({tool: TOOL_ELLIPSE})}/></div>
                  <div
                    style={tool == TOOL_RECTANGLE ? {color: '#C96218', margin: "auto"} : {
                      color: '#fff',
                      margin: "auto"
                    }}>
                    <Icon size={32} icon={ic_crop_din} onClick={() => this.setState({tool: TOOL_RECTANGLE})}/></div>
                  <div className='options'>
                    <label htmlFor='' style={{fontSize: "15"}}>SIZE</label><br/>
                    {/* suwak ustawiający grubość narzędzia */}
                    <input id='size-range' className='input-range' min='1' max='20' type='range' value={size}
                           onChange={(e) => this.setState({size: parseInt(e.target.value)})}/>
                  </div>
                  <div className='options'>
                    <label htmlFor='' style={{fontSize: "15"}}>COLOR</label>
                    {/* ustawianie koloru narzędzia */}
                    <input type='color' value={color} onChange={(e) => this.setState({color: e.target.value})}/>
                  </div>
                </div>
              </div>
            </Fade>
          </div>
          <div className='col-md-10'>
            <div className='canvas'>
              <Fade>
                {/*
                Implementujemy komponent tworzący canvas ustawiając wartości nasze wartości,
                do tablicy wysyłamy narysowane kształty z serwera (items) oraz wysyłamy
                na serwer wszystkie kształty narysowane przez nas metodą onCompleteItem
                */}
                <SketchPad
                  animate={true}
                  size={size}
                  color={color}
                  fillColor={fill ? fillColor : ''}
                  items={items}
                  tool={tool}
                  onCompleteItem={(i) => socket.emit('add-item', Object.assign(i, this.props))}
                />
              </Fade>
            </div>
          </div>
          <div className='col-md-1'></div>
        </div>
      </div>
    );
  }
}
