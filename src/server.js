import express from "express";
import solicitudRoutes from "./routes/solicitud.routes.js";
import loggerMiddleware from "./middlewares/logger.middleware.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(loggerMiddleware);

// Rutas
app.use("/api/solicitudes", solicitudRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});