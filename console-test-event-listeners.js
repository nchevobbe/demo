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
        delay: 1,
        message: "worker created",
      });
      worker.onmessage = function (e) {
        console.log("📃 Message received in main script, from worker", e);
      };
      addWorkerElementToWorkerList(worker, url);
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
  terminateButton.classList.add("regular");
  terminateButton.addEventListener("click", () => {
    worker.terminate();
    li.remove();
  });
  const logButton = document.createElement("button");
  logButton.textContent = "Log";
  logButton.classList.add("regular");
  logButton.addEventListener("click", () => {
    worker.postMessage({
      type: "delay",
      delay: 10,
      message: "loggggg",
    });
  });
  li.append(info, logButton, terminateButton);
  workersList.append(li);
  li.scrollIntoView();
}

document.addEventListener("keydown", (e) => {
  if (buttons.has(e.key)) {
    const button = buttons.get(e.key);
    button.click();
  }
});
