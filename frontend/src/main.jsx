import React from 'react'
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./config/storeConfig.js";
import Router from "./router/Router.jsx";
import ToastWrapper from "./components/UI/Toast.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Router />
        <ToastWrapper />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
