const allowCORS = (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Headers", "content-type");
    res.set("Access-Control-Allow-Methods", "PATCH, DELETE");

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

const injectModel = model => (req, _, next) => {
  req.model = model;
  next();
};

module.exports = {
  allowCORS,
  enforceJSON,
  injectModel,
};
