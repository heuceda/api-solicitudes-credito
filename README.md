# API de Solicitudes de Crédito

API REST construida con Node.js, Express y Zod para que una cooperativa
reciba, consulte y evalúe solicitudes de préstamos rápidos. Los datos se
almacenan en memoria (un arreglo), no en base de datos.

## Participantes
- Helen Euceda — heuceda
- Jorge Reyes — Jreycruz
## Requisitos
- Node.js 18+

## Instalación y ejecución
```bash
npm install
npm run dev     # con nodemon (recarga automática)
# o
npm start       # sin nodemon
```

El servidor levanta en `http://localhost:3000`.

## Estructura del proyecto
```
src/
├── server.js
├── controllers/
│   └── solicitud.controller.js
├── middlewares/
│   ├── logger.middleware.js
│   ├── validate.middleware.js
│   └── errorHandler.middleware.js
├── models/
│   └── solicitud.model.js
├── schemas/
│   └── solicitud.schema.js
└── routes/
    └── solicitud.routes.js
```

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/solicitudes` | Crea una solicitud (estado siempre `PENDIENTE`) |
| GET | `/api/solicitudes` | Lista solicitudes. Filtro opcional `?estado=APROBADA` |
| GET | `/api/solicitudes/:id` | Obtiene una solicitud por id (404 si no existe) |
| PUT | `/api/solicitudes/:id` | Actualiza nombre/monto/plazo. Solo si está `PENDIENTE` |
| PATCH | `/api/solicitudes/:id/estado` | Cambia estado a `APROBADA` o `RECHAZADA` |
| DELETE | `/api/solicitudes/:id` | Elimina la solicitud |

## Ejemplo de body para POST
```json
{
  "dniCliente": "0501-2000-12345",
  "nombreCompleto": "Juan Perez",
  "montoSolicitado": 15000,
  "plazoMeses": 12,
  "tasaInteres": 3.5
}
```

## Validaciones (Zod)
- `dniCliente`: string, 13 a 15 caracteres (dígitos y guiones)
- `nombreCompleto`: string, 5 a 100 caracteres
- `montoSolicitado`: número entre 1000 y 100000
- `plazoMeses`: entero entre 1 y 60
- `tasaInteres`: opcional, por defecto `5.0`
- `estado`: no se acepta en el POST, el servidor lo fuerza a `PENDIENTE`
