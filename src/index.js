import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as BR } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./Pages/Auth/AuthOperations/auth.css";
import "./CSS/components/button.css";
import "./CSS/components/Alerts.css";
import "./CSS/components/loading.css";
import "./CSS/components/google.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuContext from "./Context/MenuContext";
import WindowContext from "./Context/WindowContext";
import "./custome.css";
import "react-loading-skeleton/dist/skeleton.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BR>
      <WindowContext>
        <MenuContext>
          <App />
        </MenuContext>
      </WindowContext>
    </BR>
  </React.StrictMode>
);
