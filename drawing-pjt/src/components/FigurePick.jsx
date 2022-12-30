import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { FigurePickerState } from "../recoil/figureState";

function FigurePick() {
  const [currentFigure, setCurrentFigure] = useRecoilState(FigurePickerState);
  // straightLine, curvedLine, circle, square, polygon
  // 버튼 클릭시 모양 변경해줌
  const figurePickClick = (e) => {
    setCurrentFigure(e.target.className);
  };
  // 변경되는 모양 확인
  useEffect(() => {
    console.log(currentFigure);
  }, [currentFigure]);
  return (
    <div>
      <button className="straightLine" onClick={figurePickClick}>
        직선
      </button>
      <button className="curvedLine" onClick={figurePickClick}>
        곡선
      </button>
      <button className="circle" onClick={figurePickClick}>
        원
      </button>
      <button className="square" onClick={figurePickClick}>
        직사각형
      </button>
      <button className="polygon" onClick={figurePickClick}>
        다각형
      </button>
    </div>
  );
}

export default FigurePick;
