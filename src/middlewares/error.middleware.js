const errorMiddleware = (err, req, res, next) => {
  if (!err.statusCode || err.statusCode === 500) {
    return res.status(500).json({ error: "Internal server error" });
  }

  res.status(err.statusCode).json({ error: err.message });
};

module.exports = errorMiddleware;
