import { useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useRecoilState } from "recoil";
import { ThickPickerState } from "../recoil/thickState";

function ThickPick() {
  const [currentThick, setCurrentThick] = useRecoilState(ThickPickerState);
  const handleThickChange = (event, newValue) => {
    setCurrentThick(newValue);
  };
  useEffect(() => {
    console.log(currentThick);
  }, [currentThick]);
  return (
    <div>
      <Box sx={{ width: 200 }}>
        <Slider
          value={typeof currentThick === "number" ? currentThick : 0}
          onChange={handleThickChange}
          aria-label="Small steps"
          defaultValue={5}
          step={5}
          marks
          min={5}
          max={50}
          valueLabelDisplay="auto"
        />
      </Box>
    </div>
  );
}

export default ThickPick;
