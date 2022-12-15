const r = (e) => {
  const o = document.getElementById("app");
  return o && (o.innerHTML = "aerr TEST " + e), `Hello Todor, ${e}!`;
};
export {
  r as hello
};
