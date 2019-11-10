const startClient = () => {
  const controller = new Controller();
  const view = new View(controller);

  view.init();
};

document.addEventListener("DOMContentLoaded", startClient);
