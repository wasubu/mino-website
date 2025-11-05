/*
todos:
[x] - fix the folder structure of cpu and reality chip
[x] - rename Modules to Misc Modules
[x] - hamburg menu breaking on smaller screens
[x] - make the sidebar be able to open and close
[x] - make Input modules independent from Misc Modules
[ ] - populate the sidebar
[ ] - make navbar elements not able to be selected
[ ] - make a custom breakpoint, after-breakpoint and before-breakpoint
[ ] - blur background on smaller screens when openning the sidebar
[ ] - customize the scrollbar of sidebar https://preline.co/docs/custom-scrollbar.html
[ ] - modules page
[ ] - if sidebar closed the sidebars text will turn gray
[ ] - bento grid module in welcome!
[ ] - work on the footer
[ ] - include every module on the sidebar
[ ] - no videos/gif but overing on them plays an animation, smooth in and out 
[ ] - Cpu and other modules say gdt.Cpu0
[ ] - maybe on mobile the sidebar is just a pop up over the main
[ ] - make small images have smaller resolution for faster loading
[ ] - add metadata for seo
[ ] - change icon to my icon
[ ] - hear me out. Module icon in the left and on the right it says like codeblock update() gdt.Slider0.Value == 100, and sliding the slider would change the value 
[ ] - on the container there would be a power button so, cpu.sincelastreload would reset. the button could play a meow sound if buttondown.
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
