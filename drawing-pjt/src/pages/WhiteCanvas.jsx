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
        <div className="pickerContainer">
          <ColorPick />
          <div className="thickContainer">
            <div className="thickTxt">두께</div> <ThickPick />
          </div>
        </div>
        <div className="btnContainer">
          <FigurePick />
          <DoBtns />
        </div>
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
  justify-content: center;
  align-items: center;
  .pickerContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 300px;
  }
  .thickContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
  }
  .thickTxt {
    margin-right: 15px;
  }
  .btnContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 400px;
  }
`;

export default WhiteCanvas;
