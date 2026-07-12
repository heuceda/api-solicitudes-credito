// Middleware listo para el esquema en particular.
function validate(schema) {
  return (req, res, next) => {
    const resultado = schema.safeParse(req.body);

    if (!resultado.success) {
      return res.status(400).json({
        error: "Datos inválidos",
        detalles: resultado.error.errors.map((e) => ({
          campo: e.path.join("."),
          mensaje: e.message,
        })),
      });
    }

    // Reemplazamos el body con los datos ya validados/parseados
    req.body = resultado.data;
    next();
  };
}

module.exports = validate;