import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

function OnScreenRender() {
  return (
    <>
      <App />
    </>
  );
}

ReactDOM.render(<OnScreenRender />, document.getElementById("root"));
