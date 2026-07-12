// Middleware de manejo de errores. 
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({
    error: "Error interno del servidor",
    mensaje: "Ocurrió un problema inesperado. Intenta más tarde.",
  });
}

module.exports = errorHandler;