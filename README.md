# Movie App Client

Una aplicación web en Node.js + Express con EJS para gestionar autenticación, explorar películas, ver detalle y administrar usuarios y películas (panel admin). Este repositorio contiene el cliente (frontend-render) que consume un backend REST configurado vía `BACKEND_URL`.

## Características
- **Auth**: registro e inicio de la sesión con JSON Web Token (JWT) via cookie.
- **Usuario**:
    - Listado de películas y buscador por título.
    - Detalle de película con imagen, datos y botón de favoritos.
    - Gestión de favoritos (agregar/eliminar).
    - Navbar desplegable (hamburger) usable en todas las vistas.
- **Admin**:
    - Panel principal.
    - CRUD de películas (crear, editar, eliminar, listar).
    - Administración de usuarios (ver todos los usuarios, crear, editar y eliminarlos).
    - Navbar con accesos directos (Inicio, Películas, Usuarios, Logout).

## Tecnologías
- Node.js, Express
- EJS (views, templating)
- CSS plano (sin frameworks)
- Fetch helper con JWT (cookie) para consumir el backend
- Axios para crear, editar y eliminar las películas por el envío de formularios.

## Dependencias y para qué se usan
- `express`: servidor HTTP y ruteo. Monta rutas para `/auth`, `/user`, `/admin`, sirve estáticos desde `src/public` y configura el motor EJS.
- `ejs`: motor de plantillas para renderizar las vistas del lado servidor (`views/**`).
- `cookie-parser`: parsea cookies entrantes (p. ej. `miToken`) para pasar el JWT al helper `conectar` y middlewares.
- `dotenv`: carga variables de entorno desde `.env` (puertos, URLs del backend y frontend, secret).
- `jsonwebtoken`: validar/usar JWT en middlewares del cliente cuando sea necesario (p. ej. `verificarToken`).
- `multer`: parsear `multipart/form-data` en rutas admin que manejan imágenes de películas (crear/editar). En el cliente se usa para reenviar al backend archivos subidos.
- `axios`: utilitario para llamadas HTTP; en este proyecto el helper principal es `fetch.js` (con `fetch` nativo). `axios` está disponible si necesitas manejar `multipart/form-data` más cómodo o interceptores.
- `form-data`: construir cuerpos `multipart/form-data` cuando se envían archivos desde el cliente hacia el backend (complementa `multer` del lado del servidor).

### Dev
- `nodemon` (script `dev`): recarga automática en desarrollo al modificar archivos.
- `jsdoc`: genera documentación de código fuente en `docs/` (script `docs`).

## Requisitos
- Node.js 
- Tener configurado y accesible el backend (API REST) y el directorio de `uploads` servido.

## Configuración
1) Clona el repositorio.
2) Crea `.env` en la raíz:

```PORT=3002``` u otro puerto
URL de backend local:
```BACKEND_URL=http://localhost:4001/api/v1/```
o URL de backend desplegado
```BACKEND_URL=https://movie-app-server-gwvm.onrender.com/api/v1/```
```SECRET_KEY='la misma llave secreta que utilizas en la API'```

3) Instala dependencias:

```powershell
npm install
```

4) Ejecuta en desarrollo (el script usa la dependencia global nodemon):

```powershell
npm run dev
```

5) Producción (simple):

```powershell
npm start
```

El servidor se levantará en `http://localhost:3002/`.

## Estructura de carpetas
- `src/app.js`: configuración base de Express, EJS y rutas.
- `src/controllers/`: controladores de auth, user y admin.
- `src/routes/`: agrupación de rutas para `/auth`, `/user`, `/admin`.
- `src/views/`: vistas EJS para público, usuario y admin.
- `src/public/`: assets públicos (`main.css`, `main.js`).
- `src/helpers/fetch.js`: helper para peticiones al backend con token.

## Endpoints relevantes (cliente)
- `GET /`: Auth y páginas públicas.
- `GET /user`: Principal de usuario.
- `GET /user/peliculas`: Listado y buscador.
- `POST /user/buscador/buscar`: Buscar por título.
- `GET /user/peliculas/:id`: Buscamos peliculas por id para mostrar detalles.
- `GET /user/userFavoritos`: Ver favoritos.
- `POST /user/userFavoritos/agregar`: Agregar favorito.
- `POST /user/userFavoritos/eliminar`: Eliminar favorito.
- `GET /admin`: Panel del administrador.
- `GET /admin/movies`: Películas (admin CRUD vistas).
- `GET /admin/user`: Usuarios (admin vistas).

## Variables de entorno
- `BACKEND_URL`: Base del backend, p.ej. `http://localhost:4001/api/v1/`.
- `PORT`: Puerto del cliente.
- `SECRET_KEY`: Clave usada para firmar/validar JWT.

## Detalles de integración
- El helper `conectar(url, method, body, token)`:
	- Usa `Authorization: Bearer <token>` si existe cookie `miToken`.
	- Lee la respuesta una sola vez para evitar "Body already read".
	- Propaga errores HTTP con el cuerpo (JSON o texto) para un manejo amigable en vistas.

## Navegación (navbar)
- Usuario: `views/user/templates/nav.ejs` con `.hamburger` + `.nav`.
- Admin: `views/admin/template/navAdmin.ejs` incluido en todas las vistas admin de usuarios y películas.
- El script `main.js` se carga en el `footer` y:
	- Alterna `.nav.open` al hacer click en la hamburguesa.
	- Cierra al hacer click fuera o `Escape`.

## Flujo de usuario
- Login → principal → Películas → buscar → ver más → agregar a favoritos.
- Los corazones se muestran llenos/vacíos según tus favoritos.

## Flujo de admin
- Panel → Usuarios (crear, ver todos, editar, eliminar) → Películas (crear, listar, editar, eliminar).

## Desarrollo rápido
- Ajusta `BACKEND_URL` a tu API.
- Asegúrate de servir `/uploads` desde el backend; el cliente genera URLs como `BACKEND_URL/uploads/<filename>`.

## Scripts
- `npm run dev`: arranca usando nodemon (si está configurado).
- `npm start`: arranque normal.
- `npm run docs`: genera documentación JSDoc en la carpeta `docs/`.
	- Instala JSDoc si no lo tienes:

```powershell / cmd
npm install --save-dev jsdoc
```
## Documentación con JSDoc
- Escribe comentarios JSDoc sobre funciones, controladores y middlewares:

```js
/**
 * Muestra el panel de admin.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
function mostrarPanelAdmin(req, res) { /* ... */ }
```

- Genera la documentación:

```powershell
npm run docs
```

- Abre `docs/index.html` en tu navegador para verla.

### Cómo generar la documentación (paso a paso)
- Instala la dependencia de desarrollo (si aún no está instalada):

```powershell
npm install --save-dev jsdoc
```

- Revisa el archivo de configuración `jsdoc.json` (está en la raíz). Usa estas claves:
	- `source.include`: carpeta a documentar (`src`).
	- `opts.destination`: carpeta de salida (`docs`).

- Genera los archivos HTML:

```powershell
npm run docs
```

- Abre el índice en tu navegador:
	- Windows: `c:\Users\Zahir28\Desktop\bootcamp\PROYECTOS\movie-app-client\docs\index.html`
	- O directamente: `docs/index.html` desde tu editor/Explorador.

- Nota: cada ejecución sobrescribe el contenido anterior en `docs/`. Si quieres conservar versiones, cambia `opts.destination` en `jsdoc.json` (por ejemplo `docs/v2`).


