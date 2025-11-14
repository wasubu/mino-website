/*
RGdocs streghts:
not bloated - the site is kept simple and free of ads.
begginner free - very intuitive documentation while jam packed of information
interactive - easy to grasp concepts with interactive components
responsive - lightning fast performance and small screen friendly
quick navigation - find docs with less hesitation
built from scratch - avoid bulky libaries and embraces custom components

To do list:
[x] - fix the folder structure of cpu and reality chip
[x] - rename Modules to Misc Modules
[x] - hamburg menu breaking on smaller screens
[x] - make the sidebar be able to open and close
[x] - make Input modules independent from Misc Modules
[x] - maybe on mobile the sidebar is just a pop up over the main
[x] - blur background on smaller screens when openning the sidebar
[x] - fix dimming when openning the sidebar on smaller screens
[x] - if sidebar closed the sidebars text will turn gray
[x] - make navbar elements not able to be selected
[x] - add metadata for seo
[x] - eliminate the very small shadow on the sidebar
[x] - customize the scrollbar of sidebar https://preline.co/docs/custom-scrollbar.html
[ ] - populate the sidebar
[ ] - modules page
[ ] - openning the sidebar would shift the main content slightly
[ ] - new sidebar tab where you can search
[ ] - bento grid module in welcome!
[ ] - lua will be included in the docs, luau too
[ ] - docutmentRoutes.json contains each element. element has to: name: component:
[ ] - don't use canvas or pixijs, just use react for interactive components
[ ] - main screens contents sizes based of the parent not the viewport Container queries
[ ] - work on the footer
[ ] - include every module on the sidebar
[ ] - smaller screens, clicking an item in the sidebar would close it
[ ] - no videos/gif but overing on them plays an animation, smooth in and out 
[ ] - make a custom breakpoint, after-breakpoint and before-breakpoint
[ ] - Cpu and other modules say gdt.Cpu0
[ ] - in the interactive code inlude, obj.Type
[ ] - make small images have smaller resolution for faster loading
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
