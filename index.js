
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    message: "Hello from nodejs-demo-app!",
    version: "1.0.0"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/add/:a/:b", (req, res) => {
  const a = Number(req.params.a);
  const b = Number(req.params.b);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    return res
      .status(400)
      .json({ error: "Both parameters must be numbers" });
  }

  res.json({ result: a + b });
});

// Only start the server when run directly (not when imported by tests)
if (require.main === module) {
  const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

  // Graceful shutdown for Docker (SIGTERM on docker stop)
  process.on("SIGTERM", () => {
    console.log("SIGTERM received, shutting down...");
    server.close(() => process.exit(0));
  });
}

module.exports = app;

