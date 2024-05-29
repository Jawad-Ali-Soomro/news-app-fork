import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from "./config/storeConfig.js";
import Router from "./router/Router.jsx";
import ToastWrapper from "./components/UI/Toast.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "./components/theme/ThemeProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="violet-light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router />
            <ToastWrapper />
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
