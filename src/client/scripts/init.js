const run = () => {
  // const view = new View(new Controller(new Model()));
  const model = new Model();
  const controller = new Controller(model);
  const view = new View(controller);

  view.init();
};

document.addEventListener("DOMContentLoaded", run);
