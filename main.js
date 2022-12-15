const n = (o) => {
  const e = document.getElementById("app");
  return console.log("found element", e), e && (e.innerHTML = "aerr TEST " + o), `Hello Todor, ${o}!`;
};
export {
  n as hello
};
