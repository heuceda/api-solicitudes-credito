const { v4: uuidv4 } = require("uuid");
const solicitudes = require("../models/solicitud.model");

function crearSolicitud(req, res) {
  const nuevaSolicitud = {
    id: uuidv4(),
    ...req.body,
    estado: "PENDIENTE", // predeterminado al crear una nueva solicitud
    fechaCreacion: new Date().toISOString(),
  };

  solicitudes.push(nuevaSolicitud);
  res.status(201).json(nuevaSolicitud);
}

function obtenerSolicitudes(req, res) {
  const { estado } = req.query;

  if (estado) {
    return res.json(solicitudes.filter((s) => s.estado === estado));
  }

  res.json(solicitudes);
}

function obtenerSolicitudPorId(req, res) {
  const solicitud = solicitudes.find((s) => s.id === req.params.id);

  if (!solicitud) {
    return res.status(404).json({ error: "Solicitud no encontrada" });
  }

  res.json(solicitud);
}

function actualizarSolicitud(req, res) {
  const solicitud = solicitudes.find((s) => s.id === req.params.id);

  if (!solicitud) {
    return res.status(404).json({ error: "Solicitud no encontrada" });
  }

  if (solicitud.estado !== "PENDIENTE") {
    return res.status(400).json({
      error: "Solo se pueden editar solicitudes con estado PENDIENTE",
    });
  }

  Object.assign(solicitud, req.body);
  res.json(solicitud);
}

function cambiarEstado(req, res) {
  const solicitud = solicitudes.find((s) => s.id === req.params.id);

  if (!solicitud) {
    return res.status(404).json({ error: "Solicitud no encontrada" });
  }

  solicitud.estado = req.body.estado;
  res.json(solicitud);
}

function eliminarSolicitud(req, res) {
  const index = solicitudes.findIndex((s) => s.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Solicitud no encontrada" });
  }

  solicitudes.splice(index, 1);
  res.status(204).send();
}


module.exports = {
  crearSolicitud,
  obtenerSolicitudes,
  obtenerSolicitudPorId,
  actualizarSolicitud,
  cambiarEstado,
  eliminarSolicitud,
};