const getToDosHandler = (req, res) => {
  const { dataHandler } = req;
  return res.json(dataHandler.getItems());
};

const createToDoHandler = (req, res) => {
  const {
    dataHandler,
    body: { text },
  } = req;

  if (!text) {
    return res.status(400).json({
      error: {
        message: "text content is empty",
      },
    });
  }

  const newItem = dataHandler.addItem(text);
  return res.json(newItem);
};

const completeToDoHandler = (req, res) => {
  const {
    dataHandler,
    params: { id },
  } = req;

  try {
    const completedItem = dataHandler.markItemComplete(id);
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
    dataHandler,
    params: { id },
  } = req;

  dataHandler.deleteItem(id);
  return res.sendStatus(204);
};

module.exports = {
  getToDosHandler,
  createToDoHandler,
  completeToDoHandler,
  deleteToDoHandler,
};
