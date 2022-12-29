import React from "react";
import WhiteCanvas from "./pages/WhiteCanvas";
import "./App.css";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        dd
        <WhiteCanvas />
      </div>
    </RecoilRoot>
  );
}

export default App;
