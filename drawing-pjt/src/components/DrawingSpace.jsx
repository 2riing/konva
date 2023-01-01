import { useState, useEffect } from "react";
import styled from "styled-components";
import { Stage, Layer, Rect, Text, Line } from "react-konva";
import { useRecoilValue } from "recoil";
import { FigurePickerState } from "../recoil/figureState";
import { ColorPickerState } from "../recoil/colorState";
import { ThickPickerState } from "../recoil/thickState";
import { stepClasses } from "@mui/material";

function DrawingSpace() {
  const [squares, setSquares] = useState([]); // 사각형
  const [newSquares, setNewSquares] = useState([]);
  const [rectFigures, setRectFigures] = useState([]);
  const [straightLine, setStraightLine] = useState([]); // 직선
  const [newStraightLine, setNewStraightLine] = useState([]);
  const [straightLineFigures, setStraightLineFigures] = useState([]);
  const [curvedLine, setCurvedLine] = useState([]); // 곡선
  const [newCurvedLine, setNewCurvedLine] = useState([]);
  const [curvedLineFigures, setCurvedLineFigures] = useState([]);
  const [circle, setCircle] = useState([]); // 원
  const [newCircle, setNewCircle] = useState([]);
  const [circleFigures, setCircleFigures] = useState([]);
  const thickPick = useRecoilValue(ThickPickerState);
  const figurePick = useRecoilValue(FigurePickerState);
  const colorPick = useRecoilValue(ColorPickerState);
  const drwanFigures = [];

  // 새로 그려질 때마다 저장
  useEffect(() => {
    setRectFigures([...squares, ...newSquares]);
  }, [squares, newSquares]);
  useEffect(() => {
    setStraightLineFigures([...straightLine, ...newStraightLine]);
  }, [straightLine, newStraightLine]);
  useEffect(() => {
    setCurvedLineFigures([...curvedLine, ...newCurvedLine]);
  }, [curvedLine, newCurvedLine]);

  useEffect(() => {
    console.log(straightLine);
  }, [straightLine]);
  useEffect(() => {
    console.log(newStraightLine);
  }, [newStraightLine]);

  // 왼쪽 클릭 시작 : 마우스 좌표 받아와서 새로운 사각형 만들기
  const handleMouseDown = (event) => {
    const { x, y } = event.target.getStage().getPointerPosition();
    if (figurePick === "straightLine") {
      if (newStraightLine.length === 0) {
        setNewStraightLine([
          {
            points: [x, y],
            key: "0",
            stroke: `${colorPick}`,
            strokeWidth: thickPick,
          },
        ]);
      }
    }
    if (figurePick === "curvedLine") {
      if (newCurvedLine.length === 0) {
        setNewCurvedLine([
          {
            points: [x, y],
            key: "0",
            stroke: `${colorPick}`,
            strokeWidth: thickPick,
          },
        ]);
      }
    }
    if (figurePick === "circle") {
      circleMouseDown(event);
    }
    if (figurePick === "square") {
      if (newSquares.length === 0) {
        setNewSquares([
          {
            x,
            y,
            width: thickPick,
            height: thickPick,
            key: "0",
            stroke: `${colorPick}`,
            strokeWidth: thickPick,
          },
        ]);
      }
    }
    if (figurePick === "polygon") {
      polygonMouseDown(event);
    }
  };

  // 왼쪽 클릭 끝, 도형 그리기 완료
  const handleMouseUp = (event) => {
    //  직선
    if (figurePick === "straightLine") {
      if (newStraightLine.length === 1) {
        const spoints = newStraightLine[0].points;
        const { x, y } = event.target.getStage().getPointerPosition();
        const annotationToAdd = {
          points: [spoints[0], spoints[1], x, y],
          key: straightLine.length + 1,
          stroke: `${colorPick}`,
          strokeWidth: thickPick,
        };
        straightLine.push(annotationToAdd);
        setNewStraightLine([]);
        setStraightLine(straightLine);
      }
    }
    if (figurePick === "curvedLine") {
      if (newCurvedLine.length === 1) {
        const spoints = newCurvedLine[0].points;
        const { x, y } = event.target.getStage().getPointerPosition();
        const annotationToAdd = {
          points: [...spoints, x, y],
          key: curvedLine.length + 1,
          stroke: `${colorPick}`,
          strokeWidth: thickPick,
        };
        curvedLine.push(annotationToAdd);
        setNewCurvedLine([]);
        setCurvedLine(curvedLine);
      }
    }
    if (figurePick === "circle") {
      circleMouseUp(event);
    }
    if (figurePick === "square") {
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
          stroke: `${colorPick}`,
          strokeWidth: thickPick,
        };
        squares.push(annotationToAdd);
        setNewSquares([]);
        setSquares(squares);
      }
    }
    if (figurePick === "polygon") {
      polygonMouseUp(event);
    }
  };

  // Rect, 요소 안에서 움직이는 이벤트, 그리고 있는 중
  const handleMouseMove = (event) => {
    if (figurePick === "straightLine") {
      if (newStraightLine.length === 1) {
        const spoints = newStraightLine[0].points;
        const { x, y } = event.target.getStage().getPointerPosition();
        setNewStraightLine([
          {
            points: [spoints[0], spoints[1], x, y],
            key: "0",
            stroke: `${colorPick}`,
            strokeWidth: thickPick,
          },
        ]);
      }
    }

    if (figurePick === "curvedLine") {
      if (newCurvedLine.length === 1) {
        const spoints = newCurvedLine[0].points;
        const { x, y } = event.target.getStage().getPointerPosition();
        setNewCurvedLine([
          {
            points: [...spoints, x, y],
            key: "0",
            stroke: `${colorPick}`,
            strokeWidth: thickPick,
          },
        ]);
      }
    }
    if (figurePick === "circle") {
      circleMouseMove(event);
    }
    if (figurePick === "square") {
      if (newSquares.length === 1) {
        // 그리고 있는 사각형이 있다면
        const sx = newSquares[0].x; // 초기 시작했떤 값을 가져옴
        const sy = newSquares[0].y;
        const { x, y } = event.target.getStage().getPointerPosition();
        setNewSquares([
          {
            x: sx,
            y: sy,
            width: x - sx,
            height: y - sy,
            key: "0",
            stroke: `${colorPick}`,
            strokeWidth: thickPick,
          },
        ]);
      }
    }
    if (figurePick === "polygon") {
      polygonMouseMove(event);
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
                stroke={value.stroke}
                strokeWidth={value.strokeWidth}
              />
            );
          })}
          {straightLineFigures.map((value) => {
            return (
              <Line
                points={value.points}
                fill="transparent"
                stroke={value.stroke}
                strokeWidth={value.strokeWidth}
              />
            );
          })}
          {curvedLineFigures.map((value) => {
            return (
              <Line
                points={value.points}
                fill="transparent"
                stroke={value.stroke}
                strokeWidth={value.strokeWidth}
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
