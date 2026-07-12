// Middleware global: se ejecuta en cada petición que llega a la app.
function requestLogger(req, res, next) {
  const fechaHora = new Date().toISOString();
  console.log(
    `[${fechaHora}] ${req.method} - ${req.originalUrl} - Body: ${JSON.stringify(
      req.body
    )}`
  );
  next();
}

module.exports = requestLogger;