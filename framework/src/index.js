import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
render(
  React.createElement(Provider, { store }, React.createElement(App, {})),
  document.getElementById("react-container")
);