import {hello, init} from "./main.js"; // note how these end with js, not ts - to be transpiled
// console.log(hello("yahooo meme"));
//
// const test = () =>{
//
// }
// export {test}
const myTest = hello("test");

init(document.getElementById("app"))
console.log("ERR", myTest)
export {}