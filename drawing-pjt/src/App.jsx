import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Konva from "konva";
import { render } from "react-dom";
import { Stage, Layer, Rect, Text } from "react-konva";
import "./App.css";

function App() {
  const myClickEvent = () => {
    console.log("click!");
  };
  return (
    <div className="App">
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Text text="mytext test" />
          <Rect
            x={100}
            y={100}
            width={500}
            height={500}
            fill="red"
            shadowBlur={5}
            onClick={myClickEvent}
          />
        </Layer>
      </Stage>
    </div>
  );
}

export default App;
