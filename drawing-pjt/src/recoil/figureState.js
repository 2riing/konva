import { atom } from "recoil";
import { v1 } from "uuid";

export const FigurePickerState = atom({
  key: `FigurePickerState/${v1()}`,
  default: "square",
});
