import React, {Component} from 'react';
import Header from '../Header/Header';
import {Link} from 'react-router-dom';
import Fade from 'react-reveal/Fade';

class Info extends Component {

  render() {
    return (
      <div className='info'>
        <Header/>
        <Fade>
          <div className='row'>
            <div className='col-lg-2'/>
            <div className='col-lg-8'>
              <h4>
                No to zaczynamy <a className='ion-android-happy'/>
              </h4>
              <p>
                Cześć! Jestem Piio. Chcę pomóc ci w nauce. Wiesz jak to jest podczas nauki dajmy na to matematyki? Ważne
                jest, aby tłumaczyć zagadnienia na przykładach, ale tłumaczenie zadań zdalnie od zawsze było dużym
                probleme. No właśnie ja rozwiązuje ten problem. Dzięki mnie możesz tworzyć i dołaczać do pokoi tak samo
                jakbyś wchodził do klasy. Masz tu wszystko czego potrzebujesz czyli tablice i czat do komunikacji. I to
                wszystko na żywo! Od teraz nauka przez internet stanie się prosta :D.
              </p>
              <p>
                <Link
                  className='btn btn-sample'
                  role='button'
                  to='/moremore'>
                  Więcej informacji »
                </Link>

                <Link
                  className='btn btn-sample'
                  role='button'
                  to='/log'>
                  Zaloguj się <i className='ion-android-add'/>
                </Link>
              </p>
            </div>
            <div className='col-lg-2'/>
          </div>
        </Fade>
      </div>
    );
  }
}

export default Info;
