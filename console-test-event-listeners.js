const buttons = new Map();
[...document.querySelectorAll("[data-key]")].forEach((btn) =>
  buttons.set(btn.getAttribute("data-key"), btn)
);
const workers = [];

document.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const button = e.target;
    if (button.getAttribute("data-key")) {
      handleLog(button.getAttribute("data-key"));
    }
    if (button.getAttribute("data-testcase")) {
      handleTestCase(button.getAttribute("data-testcase"));
    }

    // workers
    if (button.classList.contains("worker-spawn")) {
      const url = "worker.js?id=" + workers.length;
      const worker = new Worker(url);
      workers.push(worker);
      worker.postMessage({
        type: "delay",
        delay: 1000,
        message: "worker created",
      });
      worker.onmessage = function (e) {
        console.log("Message received from worker", e);
      };
      addWorkerElementToWorkerList(worker, url);
    }

    if (button.classList.contains("worker-spawn-remote")) {
      const url =
        "http://nicolaschevobbe.com/javascript/worker.js?id=" + workers.length;
      const remoteWorker = new Worker(url);
      workers.push(remoteWorker);
      remoteWorker.postMessage({
        type: "delay",
        delay: 2000,
        message: "remote worker created",
      });
      remoteWorker.onmessage = function (e) {
        console.log("Message received from remote worker", e);
      };
      addWorkerElementToWorkerList(remoteWorker, url);
    }

    const isToggler = button.hasAttribute("aria-pressed");
    if (isToggler) {
      button.setAttribute(
        "aria-pressed",
        button.getAttribute("aria-pressed") !== "true"
      );
      const activate = () => {
        if (button.getAttribute("aria-pressed") === "true") {
          onButtonActivate(button);
          setTimeout(activate, 20);
        }
      };
      activate();
    } else {
      onButtonActivate(button);
      button.classList.add("active");
      setTimeout(() => button.classList.remove("active"), 200);
    }
  }
});

function addWorkerElementToWorkerList(worker, url) {
  const workersList = document.querySelector("section.workers ul");
  const li = document.createElement("li");
  const info = document.createElement("span");
  info.textContent = url;
  const terminateButton = document.createElement("button");
  terminateButton.textContent = "Terminate";
  terminateButton.addEventListener("click", () => {
    worker.terminate();
    li.remove();
  });
  li.append(info, terminateButton);
  workersList.append(li);
}

document.addEventListener("keydown", (e) => {
  if (buttons.has(e.key)) {
    const button = buttons.get(e.key);
    button.click();
  }
});
