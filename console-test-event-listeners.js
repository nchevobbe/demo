const buttons = new Map();
[...document.querySelectorAll("[data-key]")].forEach((btn) =>
  buttons.set(btn.getAttribute("data-key"), btn)
);

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
      spawnWorker();
    }
    if (button.classList.contains("worker-spawn-log")) {
      spawnWorker({ log: true });
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

document.addEventListener("keydown", (e) => {
  if (buttons.has(e.key)) {
    const button = buttons.get(e.key);
    button.click();
  }
});
