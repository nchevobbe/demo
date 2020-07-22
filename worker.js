onmessage = function (e) {
  console.log("⚙️ Message received in worker", e, globalThis);
  const { type } = e.data;

  if (type == "delay") {
    console.info("⚙️ delay, echoing ", e.data, "…");
    setTimeout(() => {
      console.log("⚙️ …echo");
      postMessage(`··${e.data.message}··`);
    }, e.data.delay);
  }
};
