# Pet Adoption API


API backend desarrollada con Node.js y Express para gestionar solicitudes de adopción de mascotas.

---

## 🚀 Descripción

Este proyecto implementa una API  para administrar solicitudes de adopción de mascotas.  

Incluye:

- Tests funcionales completos
- Documentación con Swagger
- Containerización con Docker
- Publicación en DockerHub

---

## 🛠️ Tecnologías utilizadas

- Node.js
- Express
- Jest
- Supertest
- Faker.js
- Docker
- DockerHub
- Swagger (OpenAPI)
- Dotenv
- Helmet

---

## 📁 Estructura del proyecto

```txt
pet-adoption-api/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   └── swagger.js
│   ├── controllers/
│   │   ├── adoption.controller.js
│   │   └── user.controller.js
│   ├── data/
│   │   ├── adoption.memory.js
│   │   └── user.memory.js
│   ├── middlewares/
│   │   ├── errorHandler.js
│   │   └── notFoundHandler.js
│   ├── routes/
│   │   ├── adoption.router.js
│   │   └── user.router.js
│   └── services/
│       ├── adoption.service.js
│       └── user.service.js
├── tests/
│   └── adoption.router.test.js
├── Dockerfile
├── .dockerignore
├── .env
├── README.md
└── package.json

⚙️ Instalación
npm install

▶️ Ejecución del proyecto

Modo desarrollo:

npm run dev

Modo producción:

npm start

🧪 Tests funcionales
npm test

Se validan:

Endpoints completos
Validaciones de datos
Errores 400, 404 y 500
Uso de mocks
Generación de datos con Faker.js

📚 Documentación Swagger

Acceder a:

http://localhost:3000/api/docs

🔗 Endpoints

GET /

Verifica estado de la API

GET /api/adoptions

Lista todas las adopciones

GET /api/adoptions/:id

Obtiene una adopción por ID

POST /api/adoptions

Crear adopción

{
  "petName": "Rocky",
  "petType": "dog",
  "adopterName": "Juan Perez",
  "adopterEmail": "juan@test.com"
}
PUT /api/adoptions/:id/status
{
  "status": "approved"
}

Estados válidos:

pending
approved
rejected
DELETE /api/adoptions/:id

Elimina adopción

🐳 Docker
Build

docker build -t juanisa/pet-adoption-api:1.0.0 .

Run
docker run -p 3000:3000 juanisa/pet-adoption-api:1.0.0

🌐 DockerHub

Imagen:

juanisa/pet-adoption-api:1.0.0

URL:

https://hub.docker.com/r/juanisa/pet-adoption-api

🔒 Seguridad
Helmet para headers HTTP
Validación de datos
Manejo global de errores
⚡ Optimización Docker
Imagen ligera (node:20-alpine)
Solo dependencias productivas
Uso de .dockerignore

📌 Autor

Juanita Perez Arias

✅ Estado

✔ API funcional
✔ Tests completos
✔ Docker funcionando
✔ Imagen en DockerHub
✔ Swagger documentado