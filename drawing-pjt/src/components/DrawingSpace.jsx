import { useState } from "react";
import styled from "styled-components";
import { Stage, Layer, Rect, Text } from "react-konva";
import { useRecoilValue } from "recoil";
import { FigurePickerState } from "../recoil/figureState";

function DrawingSpace() {
  const [squares, setSquares] = useState([]);
  const [newSquares, setNewSquares] = useState([]); // 새로 그리는 사각형
  const [straightLine, setStraightLine] = useState([]);
  const [newStraightLine, setNewStraightLine] = useState([]); // 새로 그리는 직선
  const figurePick = useRecoilValue(FigurePickerState);
  const rectFigures = [...squares, ...newSquares];

  const handleMouseDown = (event) => {
    if (figurePick === "straightLine") {
      straightLineMouseDown(event);
    }
    if (figurePick === "curvedLine") {
      curvedLineMouseDown(event);
    }
    if (figurePick === "circle") {
      circleMouseDown(event);
    }
    if (figurePick === "square") {
      rectMouseDown(event);
    }
    if (figurePick === "polygon") {
      polygonMouseDown(event);
    }
  };
  const handleMouseUp = (event) => {
    if (figurePick === "straightLine") {
      straightLineMouseUp(event);
    }
    if (figurePick === "curvedLine") {
      curvedLineMouseUp(event);
    }
    if (figurePick === "circle") {
      circleMouseUp(event);
    }
    if (figurePick === "square") {
      rectMouseUp(event);
    }
    if (figurePick === "polygon") {
      polygonMouseUp(event);
    }
  };
  const handleMouseMove = (event) => {
    if (figurePick === "straightLine") {
      straightLineMouseMove(event);
    }
    if (figurePick === "curvedLine") {
      curvedLineMouseMove(event);
    }
    if (figurePick === "circle") {
      circleMouseMove(event);
    }
    if (figurePick === "square") {
      rectMouseMove(event);
    }
    if (figurePick === "polygon") {
      polygonMouseMove(event);
    }
  };

  // Rect, 왼쪽 클릭 시작 : 마우스 좌표 받아와서 새로운 사각형 만들기
  const rectMouseDown = (event) => {
    if (newSquares.length === 0) {
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewSquares([{ x, y, width: 0, height: 0, key: "0" }]);
    }
  };

  // Rect, 왼쪽 클릭 끝
  const rectMouseUp = (event) => {
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

  // Rect, 요소 안에서 움직이는 이벤트
  const rectMouseMove = (event) => {
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
    <DrawingSpaceContainer>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          <Text text="mytext test" />
          {rectFigures.map((value) => {
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
    </DrawingSpaceContainer>
  );
}

const DrawingSpaceContainer = styled.div`
  border: 5px solid black;
`;

export default DrawingSpace;
