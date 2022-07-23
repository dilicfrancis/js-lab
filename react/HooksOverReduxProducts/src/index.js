import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import buildShop from "./hooks-store/products-store";
import "./index.css";
import App from "./App";

buildShop();

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
