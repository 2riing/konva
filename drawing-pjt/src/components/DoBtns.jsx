import React from "react";

function DoBtns(props) {
  const eraseAll = () => {
    localStorage.clear();
    location.reload();
  };
  return (
    <div>
      <button>redo</button>
      <button>undo</button>
      <button onClick={eraseAll}>전체 초기화</button>
    </div>
  );
}

export default DoBtns;
