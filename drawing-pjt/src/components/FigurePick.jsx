import React from "react";
import { useRecoilValue } from "recoil";
import { FigurePickerState } from "../recoil/figureState";

function FigurePick() {
  const currentFigure = useRecoilValue(FigurePickerState);
  // straightLine, curvedLine, circle, rect, polygon
  return (
    <div>
      <button>직선</button>
      <button>곡선</button>
      <button>원</button>
      <button>직사각형</button>
      <button>다각형</button>
    </div>
  );
}

export default FigurePick;
