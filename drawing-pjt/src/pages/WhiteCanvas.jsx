import React from "react";
import styled from "styled-components";
import ColorPick from "../components/ColorPick";
import DoBtns from "../components/DoBtns";
import ThickPick from "../components/ThickPick";
import DrawingSpace from "../components/DrawingSpace";
import FigurePick from "../components/FigurePick";

function WhiteCanvas() {
  return (
    <WhiteCanvasContainer>
      <WhiteCanvasTopContainer>
        <DoBtns />
        <ColorPick />
        <ThickPick />
        <FigurePick />
      </WhiteCanvasTopContainer>
      <DrawingSpace />
    </WhiteCanvasContainer>
  );
}

const WhiteCanvasContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WhiteCanvasTopContainer = styled.div`
  display: flex;
`;

export default WhiteCanvas;
