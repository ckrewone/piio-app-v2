import { v4 } from 'uuid';

export const TOOL_ERASE = 'erase';

export default (context) => {
  let stroke = null;
  let points = [];

  const onMouseDown = (x, y, color, size) => {
    stroke = {
      id: v4(),
      tool: TOOL_ERASE,
      size,
      points: [{ x, y }]
    };
    return [stroke];
  };

  const drawLine = () => {
    context.save();
    context.beginPath();
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);
  };

  const onMouseMove = (x, y) => {
    const newPoint = { x, y };
    stroke.points.slice(-1)[0];
    drawLine();
    stroke.points.push(newPoint);

    return [stroke];
  };

  const onDebouncedMouseMove = () => {
    const debouncedPoints = points;
    points = [];
    return [stroke, debouncedPoints];
  };

  const onMouseUp = (x, y) => {
    onMouseMove(x, y);
    const item = stroke;
    return [item];
  };

  const draw = () => drawLine();


  return {
    onMouseDown,
    onMouseMove,
    onDebouncedMouseMove,
    onMouseUp,
    draw,
  };
};
