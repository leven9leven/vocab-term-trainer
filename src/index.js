import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Store from "./Store";

const Index = () => {
  return (
    <Store>
      <App />
    </Store>
  );
};
ReactDOM.render(
  // <React.StrictMode>
  <Index />,
  // </React.StrictMode>,
  document.getElementById("root")
);
