import { v4 } from 'uuid';

export const TOOL_ELLIPSE = 'ellipse';

export default (context) => {
  let ellipse = null;
  let imageData = null;

  const onMouseDown = (x, y, color, size, fill) => {
    ellipse = {
      id: v4(),
      tool: TOOL_ELLIPSE,
      color,
      size,
      fill,
      start: { x, y },
      end: null
    };
    imageData = context.getImageData(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);
    return [ellipse];
  };

  const drawEllipse = (item, mouseX, mouseY) => {
    const startX = mouseX < item.start.x ? mouseX : item.start.x;
    const startY = mouseY < item.start.y ? mouseY : item.start.y;
    const endX = mouseX >= item.start.x ? mouseX : item.start.x;
    const endY = mouseY >= item.start.y ? mouseY : item.start.y;
    const radiusX = (endX - startX) * 0.5;
    const radiusY = (endY - startY) * 0.5;
    const centerX = startX + radiusX;
    const centerY = startY + radiusY;

    context.save();
    context.beginPath();
    context.lineWidth = item.size;
    context.strokeStyle = item.color;
    context.fillStyle = item.fill;

    context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);

    context.stroke();
    if (item.fill) context.fill();
    context.closePath();
    context.restore();
  };

  const onMouseMove = (x, y) => {
    if (!ellipse) return;
    context.putImageData(imageData, 0, 0);
    drawEllipse(ellipse, x, y);
  };

  const onMouseUp = (x, y) => {
    if (!ellipse) return;
    onMouseMove(x, y);
    const item = ellipse;
    imageData = null;
    ellipse = null;
    item.end = { x, y };
    return [item];
  };

  const draw = (item) => drawEllipse(item, item.end.x, item.end.y);

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    draw
  };
};
