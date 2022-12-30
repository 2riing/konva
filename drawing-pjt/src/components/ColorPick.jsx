import { useEffect } from "react";
import { CompactPicker } from "react-color";
import { useRecoilState } from "recoil";
import { ColorPickerState } from "../recoil/colorState";

function ColorPick(props) {
  const [currentColor, setCurrentColor] = useRecoilState(ColorPickerState);
  const handleChangeComplete = (color) => {
    setCurrentColor(color.hex);
  };
  useEffect(() => {
    console.log(currentColor);
  }, [currentColor]);
  return (
    <div>
      <CompactPicker
        color={currentColor}
        onChangeComplete={handleChangeComplete}
      />
    </div>
  );
}

export default ColorPick;
