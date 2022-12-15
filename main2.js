import { init as t, hello as e } from "./main.js";
const o = e("test");
t(document.getElementById("app"));
console.log("ERR", o);
