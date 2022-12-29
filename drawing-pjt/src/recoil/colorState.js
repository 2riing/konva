import { atom } from "recoil";
import { v1 } from "uuid";

export const ColorPickerState = atom({
  key: `ColorPickerState/${v1()}`,
  default: "red",
});
