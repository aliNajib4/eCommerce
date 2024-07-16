import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/main.scss";
import AppRouter from "@routes/AppRouter";
import React from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
);
