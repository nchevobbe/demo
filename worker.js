onmessage = function (e) {
  console.log("⚙️ Message received in worker", e, globalThis);
  const { type } = e.data;

  if (type == "delay") {
    console.info("delay, echoing ", e, "…");
    setTimeout(() => {
      postMessage(`··${e.data.message}··`);
      console.log("…echo", new Date());
    }, e.data.delay);
  }
};
