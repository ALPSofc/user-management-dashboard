import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AppProviders } from "./app/providers/AppProviders";
import { worker } from "./mocks/browser";

async function enableMocking() {
  if (import.meta.env.DEV) {
    await worker.start({ onUnhandledRequest: "bypass" });
  }
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <AppProviders />
    </React.StrictMode>
  );
});
