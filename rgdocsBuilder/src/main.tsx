/*
todos:
[x] - fix the folder structure of cpu and reality chip
[x] - rename Modules to Misc Modules
[x] - hamburg menu breaking on smaller screens
[x] - make the sidebar be able to open and close
[x] - make Input modules independent from Misc Modules
[ ] - customize the scrollbar of sidebar https://preline.co/docs/custom-scrollbar.html
[ ] - bento grid module in welcome!
[ ] - Cpu and other modules say gdt.Cpu0
[ ] - work on the footer
[ ] - include every module on the sidebar
[ ] - maybe on mobile the sidebar is just a pop up over the main
[ ] - make small images have smaller resolution for faster loading
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
