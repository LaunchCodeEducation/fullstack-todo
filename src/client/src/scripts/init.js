const run = () => {
  const model = new Model();
  const controller = new Controller(model);
  const view = new View(controller);

  view.init();
};

document.addEventListener("DOMContentLoaded", run);
