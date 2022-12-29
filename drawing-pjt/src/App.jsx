import { useState, useRef } from "react";
import Konva from "konva";
import { Stage, Layer, Rect, Text } from "react-konva";
import "./App.css";

function App() {
  const [squares, setSquares] = useState([]);
  const [newSquares, setNewSquares] = useState([]); // 새로 그리는 사각형
  const figures = [...squares, ...newSquares];

  // 왼쪽 클릭 시작 : 마우스 좌표 받아와서 새로운 사각형 만들기
  const handleMouseDown = (event) => {
    if (newSquares.length === 0) {
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewSquares([{ x, y, width: 0, height: 0, key: "0" }]);
    }
  };

  // 왼쪽 클릭 끝
  const handleMouseUp = (event) => {
    if (newSquares.length === 1) {
      // 기존에 마우스 클릭을 시작했던 좌표
      const sx = newSquares[0].x;
      const sy = newSquares[0].y;
      // 새로 받아온 좌표
      const { x, y } = event.target.getStage().getPointerPosition();
      const annotationToAdd = {
        x: sx,
        y: sy,
        width: x - sx,
        height: y - sy,
        key: squares.length + 1,
      };
      squares.push(annotationToAdd);
      setNewSquares([]);
      setSquares(squares);
    }
  };

  // 요소 안에서 움직이는 이벤트
  const handleMouseMove = (event) => {
    if (newSquares.length === 1) {
      const sx = newSquares[0].x;
      const sy = newSquares[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewSquares([
        {
          x: sx,
          y: sy,
          width: x - sx,
          height: y - sy,
          key: "0",
        },
      ]);
    }
  };

  return (
    <div className="App">
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          <Text text="mytext test" />
          {figures.map((value) => {
            return (
              <Rect
                x={value.x}
                y={value.y}
                width={value.width}
                height={value.height}
                fill="transparent"
                stroke="black"
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
}

export default App;
