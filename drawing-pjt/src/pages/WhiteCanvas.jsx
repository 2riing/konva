import React from "react";
import ColorPick from "../components/ColorPick";
import DoBtns from "../components/DoBtns";
import ThickPick from "../components/ThickPick";
import DrawingSpace from "../components/DrawingSpace";
import FigurePick from "../components/FigurePick";

function WhiteCanvas() {
  return (
    <div>
      <DoBtns />
      <ColorPick />
      <ThickPick />
      <FigurePick />
      <DrawingSpace />
    </div>
  );
}

export default WhiteCanvas;
