const express = require("express");
const router = express.Router();

const validate = require("../middlewares/validate.middleware");
const {
  createSolicitudSchema,
  updateSolicitudSchema,
  cambiarEstadoSchema,
} = require("../schemas/solicitud.schema");
const controller = require("../controllers/solicitud.controller");

router.post("/", validate(createSolicitudSchema), controller.crearSolicitud);
router.get("/", controller.obtenerSolicitudes);
router.get("/:id", controller.obtenerSolicitudPorId);
router.put(
  "/:id",
  validate(updateSolicitudSchema),
  controller.actualizarSolicitud
);
router.patch(
  "/:id/estado",
  validate(cambiarEstadoSchema),
  controller.cambiarEstado
);
router.delete("/:id", controller.eliminarSolicitud);

module.exports = router;