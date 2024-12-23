import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./apis/store";
import React from "react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
