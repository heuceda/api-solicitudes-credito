const { z } = require("zod");

// Acepta dígitos y guiones, entre 13 y 15 caracteres (ej: 0501-2000-12345)
const dniRegex = /^[0-9-]{13,15}$/;

const createSolicitudSchema = z.object({
  dniCliente: z
    .string()
    .regex(dniRegex, "dniCliente debe tener entre 13 y 15 caracteres (dígitos y guiones)"),
  nombreCompleto: z
    .string()
    .min(5, "nombreCompleto debe tener al menos 5 caracteres")
    .max(100, "nombreCompleto no puede superar 100 caracteres"),
  montoSolicitado: z
    .number({ required_error: "montoSolicitado es obligatorio" })
    .min(1000, "montoSolicitado debe ser mayor o igual a 1000")
    .max(100000, "montoSolicitado debe ser menor o igual a 100000"),
  plazoMeses: z
    .number({ required_error: "plazoMeses es obligatorio" })
    .int("plazoMeses debe ser un número entero")
    .min(1, "plazoMeses mínimo es 1")
    .max(60, "plazoMeses máximo es 60"),
  tasaInteres: z.number().optional().default(5.0),
});

// Usado en PUT /api/solicitudes/:id
// Todos los campos son opcionales, pero se exige al menos uno.
const updateSolicitudSchema = z
  .object({
    nombreCompleto: z.string().min(5).max(100).optional(),
    montoSolicitado: z.number().min(1000).max(100000).optional(),
    plazoMeses: z.number().int().min(1).max(60).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debe enviar al menos un campo para actualizar",
  });


  // Usado en PATCH /api/solicitudes/:id/estado
const cambiarEstadoSchema = z.object({
  estado: z.enum(["APROBADA", "RECHAZADA"], {
    errorMap: () => ({ message: "estado debe ser APROBADA o RECHAZADA" }),
  }),
});

module.exports = {
  createSolicitudSchema,
  updateSolicitudSchema,
  cambiarEstadoSchema,
};