import { atom } from "recoil";
import { v1 } from "uuid";

export const ThickPickerState = atom({
  key: `ThickPickerState/${v1()}`,
  default: 5,
});
