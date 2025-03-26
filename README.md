# Prueba técnica para Davivienda.

Hola! Mi nombre es Juan Camilo Florez Paez, soy Ingeniero de sistemas y desarrollador de Software, a continuación presentaré que se encuentra en el BackEnd y que opciones tomé para el desarrollo de este aplicativo.

## Stack Utilizado.

Para esta ocasión, decidí utilizar una base de datos relacional, específicamente PostgreSQL. Para el backend, opté por una tecnología rápida de implementar y con pocas configuraciones adicionales, por lo que elegí Node.js con el framework Express.

En el frontend, trabajé con React, ya que tengo mayor experiencia con esta tecnología en comparación con Angular (las únicas opciones disponibles para el desarrollo de esta aplicación).
## Diseño.
Para el diseño de la aplicación en el frontend, utilicé Material UI, una librería que facilita la integración de colores, esquemas y componentes de manera rápida y sencilla.
El diseño no fue tomado de ninguna plantilla, es completamente hecho por mí. Lo único en lo que pedí ayuda a ChatGPT fue en la sugerencia de un esquema de colores.
## Prácticas utilizadas.
Desarrollé la aplicación en Visual Studio Code, utilizando diversas extensiones que empleo en mi día a día, incluyendo snippets que agilizan el desarrollo de una aplicación de estas características.

Además, usé GitHub Copilot para autocompletar o repetir ciertas secciones de código cuando fue necesario. ChatGPT se utilizó únicamente para resolver inquietudes puntuales, pero no para el desarrollo completo de la aplicación.
## Clean Code

Dentro del desarrollo se puede ver que componentes, archivos y variables tratan de seguir una arquitectura limpia y organizada para futuros desarrolladores que podrían llegar a realizar modificaciones en el mismo.

## Dependecias

### Backend
En el backend, los servicios utilizan un ORM. En este caso, elegí Prisma ORM, una herramienta eficiente y fácil de integrar con Node.js. Esto evita escribir consultas SQL manuales dentro del código, reduciendo vulnerabilidades y permitiendo la migración y creación de bases de datos de forma automática.

También utilicé herramientas de desarrollo como nodemon, que permite reiniciar el servidor automáticamente para agilizar el desarrollo.

### Frontend

En el frontend, utilicé varias dependencias, entre ellas:

- [x] Axios: Para el manejo de peticiones HTTP de manera más controlada, facilitando la configuración global de headers, como el de autenticación.
- [x] Day.js: Para el manejo de fechas de manera eficiente, sin necesidad de realizar cambios complejos en los formatos de fecha.
- [x] SweetAlert: Para generar alertas interactivas y mejorar la experiencia del usuario.
