/*
todos:
[ ] - hamburg menu breaking on smaller screens
[ ] - make the sidebar be able to open and close
[ ] - fix the folder structure of cpu and reality chip
[ ] - rename Modules to Misc Modules
[ ] - customize the scrollbar https://preline.co/docs/custom-scrollbar.html
[ ] - bento grid module in welcome!
*/

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
