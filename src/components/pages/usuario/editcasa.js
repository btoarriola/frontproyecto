import React, { useState, useRef, useEffect } from "react";

function EditCasa() {
  const [rectangles, setRectangles] = useState([]);
  const [undo, setUndo] = useState(false);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(null);
  const [startY, setStartY] = useState(null);
  const [endX, setEndX] = useState(null);
  const [endY, setEndY] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    setStartX(e.nativeEvent.offsetX);
    setStartY(e.nativeEvent.offsetY);
  };

  const handleMouseMove = (e) => {
    if (isDrawing) {
      setEndX(e.nativeEvent.offsetX);
      setEndY(e.nativeEvent.offsetY);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    const newRectangle = {
      x: Math.min(startX, endX),
      y: Math.min(startY, endY),
      width: Math.abs(endX - startX),
      height: Math.abs(endY - startY),
    };
    setRectangles([...rectangles, newRectangle]);
    setUndo(true);
  
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    rectangles.forEach((rectangle) => {
      ctx.fillStyle = "blue";
      ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    });
  };
  

  const handleUndoClick = () => {
    if (undo && rectangles.length > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const lastRectangle = rectangles[rectangles.length - 1];
      ctx.fillStyle = "black";
      ctx.fillRect(
        lastRectangle.x,
        lastRectangle.y,
        lastRectangle.width,
        lastRectangle.height
      );
      setRectangles(rectangles.slice(0, rectangles.length - 1));
      setUndo(false);
    }
  };
  console.log(rectangles);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={300}
        height={400}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <button onClick={handleUndoClick} disabled={!undo}>
        Undo
      </button>
    </div>
  );
}

export default EditCasa;
