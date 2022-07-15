import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { TaskProvider } from "./context/TaskContext";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./error/errorboundary";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <TaskProvider>
     <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={() => {
      window.location.reload()
    }}
  >
      <App />
    </ErrorBoundary>
  </TaskProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
