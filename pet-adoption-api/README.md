# Pet Adoption API

API backend desarrollada con Node.js y Express para gestionar solicitudes de adopción de mascotas.

## Tecnologías utilizadas

- Node.js
- Express
- Jest
- Supertest
- Faker.js
- Docker
- DockerHub
- Swagger/OpenAPI
- Helmet
- Dotenv

## Objetivo del proyecto

El objetivo de este proyecto es crear una API backend para gestionar solicitudes de adopción de mascotas, incluyendo tests funcionales completos, documentación Swagger y una imagen Docker lista para publicar en DockerHub.

## Estructura del proyecto

```txt
pet-adoption-api/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   └── swagger.js
│   ├── controllers/
│   │   └── adoption.controller.js
│   ├── data/
│   │   └── adoption.memory.js
│   ├── middlewares/
│   │   ├── errorHandler.js
│   │   └── notFoundHandler.js
│   ├── routes/
│   │   └── adoption.router.js
│   └── services/
│       └── adoption.service.js
├── tests/
│   └── adoption.router.test.js
├── Dockerfile
├── .dockerignore
├── .env
├── README.md
└── package.json

Descripción de carpetas principales

src/app.js: configura Express, middlewares, rutas y Swagger.
src/server.js: inicia el servidor.
src/routes/adoption.router.js: contiene los endpoints de adopciones.
src/controllers/adoption.controller.js: maneja request y response.
src/services/adoption.service.js: contiene la lógica de negocio.
src/data/adoption.memory.js: simula una base de datos en memoria.
tests/adoption.router.test.js: contiene los tests funcionales.
Dockerfile: define la imagen Docker de producción.

Instalación
npm install

Ejecutar proyecto en desarrollo
npm run dev

Ejecutar proyecto en producción
npm start

Ejecutar tests funcionales
npm test

Documentación Swagger

Con el servidor activo, abrir:
http://localhost:3000/api/docs

Endpoints
GET /

Verifica que la API está funcionando.

GET /api/adoptions

Obtiene todas las solicitudes de adopción.

GET /api/adoptions/:id

Obtiene una solicitud de adopción por ID.

POST /api/adoptions

Crea una nueva solicitud de adopción.

Body:
{
  "petName": "Rocky",
  "petType": "dog",
  "adopterName": "Ana Torres",
  "adopterEmail": "ana@example.com"
}

PUT /api/adoptions/:id/status

Actualiza el estado de una solicitud.

Body:
{
  "status": "approved"
}

Estados válidos:
pending
approved
rejected

DELETE /api/adoptions/:id

Elimina una solicitud de adopción.

Tests funcionales

Los tests funcionales fueron realizados con Jest y Supertest.

Se validan los siguientes casos:

Obtener todas las adopciones.
Obtener una adopción por ID.
Error 404 cuando una adopción no existe.
Crear una adopción correctamente.
Error 400 cuando faltan campos obligatorios.
Error 500 usando mocks para simular fallas del servicio.
Actualizar estado correctamente.
Error 400 por estado inválido.
Eliminar una adopción.
Error 404 al eliminar una adopción inexistente.

También se usa Faker.js para generar datos falsos de prueba.

Docker
Construir imagen
docker build -t TUUSUARIO/pet-adoption-api:1.0.0 .

Ejecutar contenedor
docker run -p 3000:3000 TUUSUARIO/pet-adoption-api:1.0.0

Probar contenedor
curl http://localhost:3000
curl http://localhost:3000/api/adoptions

Imagen DockerHub

Nombre y tag de la imagen:
juanisa/pet-adoption-api:1.0.0

URL pública:
https://hub.docker.com/r/juanisa/pet-adoption-api

Decisiones de optimización Docker
Se usa node:20-alpine porque es una imagen ligera.
Se usa npm ci --omit=dev para instalar solo dependencias necesarias en producción.
Se copian primero los archivos package.json y package-lock.json para aprovechar la cache de Docker.
Se usa .dockerignore para evitar copiar archivos innecesarios.
Se define NODE_ENV=production.
Se expone únicamente el puerto 3000.
Seguridad

El proyecto usa Helmet para agregar headers HTTP seguros. Además, se validan datos obligatorios y se usa un middleware global de errores para evitar exponer detalles internos.

Repositorio GitHub



Evidencia de tests
POST /api/adoptions 500 3.343 ms - 52
PUT /api/adoptions/1/status 200 0.156 ms - 155
PUT /api/adoptions/1/status 400 0.200 ms - 45
PUT /api/adoptions/999/status 404 0.162 ms - 49
DELETE /api/adoptions/2 200 0.182 ms - 62
DELETE /api/adoptions/999 404 0.077 ms - 49
 PASS  tests/adoption.router.test.js
  Functional tests for adoption.router.js
    GET /api/adoptions
      ✓ should return all adoption requests (22 ms)
      ✓ should return 500 when service fails (26 ms)
    GET /api/adoptions/:id
      ✓ should return one adoption by id (2 ms)
      ✓ should return 404 when adoption does not exist (1 ms)
    POST /api/adoptions
      ✓ should create a new adoption request (17 ms)
      ✓ should return 400 when required fields are missing (3 ms)
      ✓ should return 500 when create service fails (5 ms)
    PUT /api/adoptions/:id/status
      ✓ should update adoption status (1 ms)
      ✓ should return 400 when status is invalid (2 ms)
      ✓ should return 404 when adoption does not exist (5 ms)
    DELETE /api/adoptions/:id
      ✓ should delete an adoption request (2 ms)
      ✓ should return 404 when adoption does not exist (1 ms)

Test Suites: 1 passed, 1 total
Tests:       12 passed, 12 total
Snapshots:   0 total
Time:        1.815 s
Ran all test suites.
juanitaperezarias@juanitas-MacBook-Air pet-adoption-api % npm start

> pet-adoption-api@1.0.0 start
> node src/server.js

Pet Adoption API running on port 3000
Environment: development
GET /api/docs 301 21.323 ms - 158
GET /api/docs/ 200 14.411 ms - 3106
GET /api/docs/swagger-ui.css 200 8.642 ms - 178958
GET /api/docs/swagger-ui-init.js 200 2.466 ms - 4115
GET /api/docs/swagger-ui-standalone-preset.js 200 73.682 ms - 251800
GET /api/docs/swagger-ui-bundle.js 200 81.345 ms - 1526785
GET /api/docs/favicon-32x32.png 200 2.604 ms - 628
GET /api/adoptions 200 28.398 ms - 283
POST /api/adoptions 400 148.898 ms - 54
npm run dev

Evidencia Docker build

juanitaperezarias@juanitas-MacBook-Air pet-adoption-api % docker build -t juanisa/pet-adoption-api:1.0.0 .
[+] Building 8.5s (10/10) FINISHED                                                                                                                                                                                                                                                                                         docker:desktop-linux
 => [internal] load build definition from Dockerfile                                                                                                                                                                                                                                                                                       0.0s
 => => transferring dockerfile: 217B                                                                                                                                                                                                                                                                                                       0.0s
 => [internal] load metadata for docker.io/library/node:20-alpine                                                                                                                                                                                                                                                                          1.6s
 => [internal] load .dockerignore                                                                                                                                                                                                                                                                                                          0.0s
 => => transferring context: 112B                                                                                                                                                                                                                                                                                                          0.0s
 => [1/5] FROM docker.io/library/node:20-alpine@sha256:fb4cd12c85ee03686f6af5362a0b0d56d50c58a04632e6c0fb8363f609372293                                                                                                                                                                                                                    3.2s
 => => resolve docker.io/library/node:20-alpine@sha256:fb4cd12c85ee03686f6af5362a0b0d56d50c58a04632e6c0fb8363f609372293                                                                                                                                                                                                                    0.0s
 => => sha256:13e45b12880fbbfe3554ecf6b70131ace701d0c2fd3e2fb9abb842ba2494cd40 1.26MB / 1.26MB                                                                                                                                                                                                                                             0.5s
 => => sha256:fb4cd12c85ee03686f6af5362a0b0d56d50c58a04632e6c0fb8363f609372293 7.67kB / 7.67kB                                                                                                                                                                                                                                             0.0s
 => => sha256:d63c387675b0ec5d7ef0c15b03691ac9f82803a8b30c87de3ce8a16960831cbc 1.72kB / 1.72kB                                                                                                                                                                                                                                             0.0s
 => => sha256:cd266ddf7e80183cbac3cb23b49e90ab83a06f14f95d28681d8468f89dc00615 6.54kB / 6.54kB                                                                                                                                                                                                                                             0.0s
 => => sha256:d17f077ada118cc762df373ff803592abf2dfa3ddafaa7381e364dd27a88fca7 4.20MB / 4.20MB                                                                                                                                                                                                                                             0.4s
 => => sha256:bda5d7ef971f8ede8ea80002d2ac886ef6807fe32cfe46c38704a7ba0429475d 43.55MB / 43.55MB                                                                                                                                                                                                                                           2.2s
 => => extracting sha256:d17f077ada118cc762df373ff803592abf2dfa3ddafaa7381e364dd27a88fca7                                                                                                                                                                                                                                                  0.1s
 => => sha256:cd322d0ddd02673e6c24a2158d1f12f6ec7c6fd9c0dc67123244d0f0eb0f8806 443B / 443B                                                                                                                                                                                                                                                 0.7s
 => => extracting sha256:bda5d7ef971f8ede8ea80002d2ac886ef6807fe32cfe46c38704a7ba0429475d                                                                                                                                                                                                                                                  0.8s
 => => extracting sha256:13e45b12880fbbfe3554ecf6b70131ace701d0c2fd3e2fb9abb842ba2494cd40                                                                                                                                                                                                                                                  0.0s
 => => extracting sha256:cd322d0ddd02673e6c24a2158d1f12f6ec7c6fd9c0dc67123244d0f0eb0f8806                                                                                                                                                                                                                                                  0.0s
 => [internal] load build context                                                                                                                                                                                                                                                                                                          0.0s
 => => transferring context: 207.51kB                                                                                                                                                                                                                                                                                                      0.0s
 => [2/5] WORKDIR /app                                                                                                                                                                                                                                                                                                                     0.2s
 => [3/5] COPY package*.json ./                                                                                                                                                                                                                                                                                                            0.0s
 => [4/5] RUN npm ci --omit=dev                                                                                                                                                                                                                                                                                                            3.2s
 => [5/5] COPY src ./src                                                                                                                                                                                                                                                                                                                   0.0s
 => exporting to image                                                                                                                                                                                                                                                                                                                     0.1s
 => => exporting layers                                                                                                                                                                                                                                                                                                                    0.1s
 => => writing image sha256:0679a506eac1dc4869a6f303fc59fcc8a40dd251388adf84c8efc899532f37a1                                                                                                                                                                                                                                               0.0s
 => => naming to docker.io/juanisa/pet-adoption-api:1.0.0                                                                                                                                                                                                                                                                                  0.0s 
juanitaperezarias@juanitas-MacBook-Air pet-adoption-api % docker run -p 3000:3000 juanisa/pet-adoption-api:1.0.0
Pet Adoption API running on port 3000
Environment: production
GET / 200 15.782 ms - 60
GET /favicon.ico 404 31.376 ms - 59
GET /api/adoptions 200 7.697 ms - 283

Evidencia Docker run
