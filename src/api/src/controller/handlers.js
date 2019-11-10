const getToDosHandler = (req, res) => {
  const { model } = req;
  return res.json(model.getItems());
};

const createToDoHandler = (req, res) => {
  const {
    model,
    body: { text },
  } = req;

  if (!text) {
    return res.status(400).json({
      error: {
        message: "text content is empty",
      },
    });
  }

  const newItem = model.addItem(text);
  return res.json(newItem);
};

const completeToDoHandler = (req, res) => {
  const {
    model,
    params: { id },
  } = req;

  try {
    const completedItem = model.markItemComplete(id);
    return res.json(completedItem);
  } catch (error) {
    return res.status(400).json({
      error: {
        message: error.message,
      },
    });
  }
};

const deleteToDoHandler = (req, res) => {
  const {
    model,
    params: { id },
  } = req;

  model.deleteItem(id);
  return res.sendStatus(204);
};

module.exports = {
  getToDosHandler,
  createToDoHandler,
  completeToDoHandler,
  deleteToDoHandler,
};
