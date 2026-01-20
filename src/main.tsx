import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AppProviders } from "@/app/providers/AppProviders";
import { worker } from "@/mocks/browser";
import App from "./App";

async function enableMocking() {
  const shouldMock =
    import.meta.env.DEV || import.meta.env.VITE_ENABLE_MSW === "true";

  if (shouldMock) {
    await worker.start({
      serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
      onUnhandledRequest: "bypass",
    });
  }
}

enableMocking();

const Providers = AppProviders as unknown as React.ComponentType<{ children?: React.ReactNode }>;

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);
