import dom from "react-dom-factories";

const App = () => {
  return [
    dom.button({
      onClick: () => console.trace("React trace")
    }, "trace"),
    dom.button({
      onClick: () => {
        throw "React exception";
      }
    }, "exception"),
    dom.button({
      onClick: () => {
        console.log(new Error("React error object"));
      }
    }, "error object"),
  ];
};
export default App;