import { useState, useEffect } from "react";
import styled from "styled-components";
import { Stage, Layer, Rect, Text, Line, Circle } from "react-konva";
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

  const [polygon, setPolygon] = useState([]); // 다각형
  const [newPolygon, setNewPolygon] = useState([]);
  const [polygonFigures, setPolygonFigures] = useState([]);

  const [points, setPoints] = useState([]);
  const [curMousePos, setCurMousePos] = useState([0, 0]);
  const [isMouseOverStartPoint, setIsMouseOverStartPoint] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const thickPick = useRecoilValue(ThickPickerState);
  const figurePick = useRecoilValue(FigurePickerState);
  const colorPick = useRecoilValue(ColorPickerState);
  const drwanFigures = [];

  const flattenedPoints = points
    .concat(isFinished ? [] : curMousePos)
    .reduce((a, b) => a.concat(b), []);

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
    setCircleFigures([...circle, ...newCircle]);
  }, [circle, newCircle]);

  // 원의 반지름을 구해주는 함수
  const getRadius = (sx, sy, x, y) => {
    const dx = Math.abs(sx - x);
    const dy = Math.abs(sy - y);
    return Math.sqrt(dx * dx + dy * dy);
  };

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
      if (newCircle.length === 0) {
        setNewCircle([
          {
            x: x,
            y: y,
            radius: 0,
            key: "0",
            stroke: `${colorPick}`,
            strokeWidth: thickPick,
          },
        ]);
      }
    }
    if (figurePick === "square") {
      if (newSquares.length === 0) {
        setNewSquares([
          {
            x: x,
            y: y,
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
      handleClick(event);
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
      if (newCircle.length === 1) {
        const sx = newCircle[0].x;
        const sy = newCircle[0].y;
        const { x, y } = event.target.getStage().getPointerPosition();
        const annotationToAdd = {
          x: sx,
          y: sy,
          radius: getRadius(sx, sy, x, y),
          key: circle.length + 1,
          stroke: `${colorPick}`,
          strokeWidth: thickPick,
        };
        circle.push(annotationToAdd);
        setNewCircle([]);
        setCircle(circle);
      }
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
      // polygonMouseUp(event);
      return;
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
      if (newCircle.length === 1) {
        const sx = newCircle[0].x;
        const sy = newCircle[0].y;
        const { x, y } = event.target.getStage().getPointerPosition();
        setNewCircle([
          {
            x: sx,
            y: sy,
            radius: getRadius(sx, sy, x, y),
            key: "0",
            stroke: `${colorPick}`,
            strokeWidth: thickPick,
          },
        ]);
      }
    }
    if (figurePick === "square") {
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
            stroke: `${colorPick}`,
            strokeWidth: thickPick,
          },
        ]);
      }
    }
    if (figurePick === "polygon") {
      const { x, y } = event.target.getStage().getPointerPosition();
      setCurMousePos([x, y]);
    }
  };
  const handleClick = (event) => {
    if (figurePick === "polygon") {
      const { x, y } = event.target.getStage().getPointerPosition();
      if (isFinished) {
        return;
      }
      if (isMouseOverStartPoint && points.length >= 3) {
        setIsFinished(true);
      } else {
        setPoints([...points, [x, y]]);
      }
    }
  };
  const handleMouseOverStartPoint = (event) => {
    if (isFinished || points.length < 3) return;
    event.target.scale({ x: 2, y: 2 });
    setIsMouseOverStartPoint(true);
  };
  const handleMouseOutStartPoint = (event) => {
    event.target.scale({ x: 1, y: 1 });
    setIsMouseOverStartPoint(false);
  };
  const handleDragMovePoint = (event) => {
    const index = event.target.index - 1;
    const { x, y } = event.target.getStage().getPointerPosition();
    setPoints([...points.slice(0, index), [x, y], ...points.slice(index + 1)]);
  };

  return (
    <DrawingSpaceContainer>
      <Stage
        width={1000}
        height={600}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
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
          {circleFigures.map((value) => {
            return (
              <Circle
                x={value.x}
                y={value.y}
                radius={value.radius}
                fill="transparent"
                stroke={value.stroke}
                strokeWidth={value.strokeWidth}
              />
            );
          })}

          <Line
            stroke="black"
            points={[50, 50, 200, 50, 200, 200, 50, 200]}
            bezier
          />
          {figurePick === "polygon" ? (
            <Line
              points={flattenedPoints}
              stroke="black"
              strokeWidth={5}
              closed={isFinished}
            />
          ) : null}
          {points.map((point, index) => {
            const width = 6;
            const x = point[0] - width / 2;
            const y = point[1] - width / 2;
            return (
              <Rect
                key={index}
                x={x}
                y={y}
                width={width}
                height={width}
                fill="white"
                stroke="black"
                strokeWidth={3}
                onDragMove={handleDragMovePoint}
                onMouseOver={handleMouseOverStartPoint}
                onMouseOut={handleMouseOutStartPoint}
                draggable
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
