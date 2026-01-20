import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AppProviders } from "@/app/providers/AppProviders";
import { worker } from "@/mocks/browser";

async function enableMocking() {
  // liga MSW no dev OU quando você setar a env var no deploy
  const shouldMock =
    import.meta.env.DEV || import.meta.env.VITE_ENABLE_MSW === "true";

  if (shouldMock) {
    await worker.start({
      serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
      onUnhandledRequest: "bypass",
    });
  }
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <AppProviders />
    </React.StrictMode>
  );
});
