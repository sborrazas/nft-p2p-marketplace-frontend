import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"
import { RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { sendToVercelAnalytics } from "./vitals";
import store from "./store"
import router from "./router"

import "./index.css";
import "./reset.css";

reportWebVitals(sendToVercelAnalytics);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
