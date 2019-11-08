const allowCORS = (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "content-type");
  res.set("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
};

const enforceJSON = (req, res, next) => {
  const contentType = req.header("content-type");

  if (contentType !== "application/json") {
    return res.status(400).json({
      error: {
        message: "Content-Type is not application/json",
        hint: "add the Content-Type header to your request",
      },
    });
  }

  next();
};

const injectDataHandler = dataHandler => (req, _, next) => {
  req.dataHandler = dataHandler;
  next();
};

module.exports = {
  allowCORS,
  enforceJSON,
  injectDataHandler,
};
