onmessage = function (e) {
  console.log("⚙️ Message received in worker", e, globalThis);
  const { type } = e.data;

  switch (type) {
    case "delay":
      setTimeout(() => {
        console.log("⚙️ …echo");
        postMessage(`··${e.data.message}··`);
      }, e.data.delay);
      break;
    case "exception":
      globalThis.x.y.x;
  }
};
