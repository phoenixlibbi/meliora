import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ContextApiStates from "./hooks/ContextApiStates";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ContextApiStates>
      <App />
    </ContextApiStates>
  </React.StrictMode>
);

// Measure performance (optional)
reportWebVitals();
