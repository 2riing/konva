import { useEffect } from "react";
import { CompactPicker } from "react-color";
import { useRecoilValue } from "recoil";
import { ColorPickerState } from "../recoil/colorState";

function ColorPick(props) {
  const currentColor = useRecoilValue(ColorPickerState);
  return (
    <div>
      <CompactPicker color={currentColor} />
    </div>
  );
}

export default ColorPick;
