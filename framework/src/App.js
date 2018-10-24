import React from "react";
const App = () => {
  console.trace();
  console.error("console.error");
  console.log(new Error("Error rep"));
  console.error(new Error("Error rep"));
  return "Hello";
};
export default App;