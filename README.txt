# Planificador de Vacaciones con Netlify Blobs

## Pasos para desplegar

1. Asegúrate de tener Node.js instalado.
2. Instala Netlify CLI: `npm install -g netlify-cli`
3. Inicia sesión: `netlify login`
4. Ejecuta `netlify init` en la carpeta del proyecto.
5. Instala dependencias: `npm install @netlify/functions @netlify/blobs`
6. Despliega: `netlify deploy --prod`

Este proyecto incluye:
- index.html actualizado para usar fetch y Netlify Functions.
- netlify/functions/vacations.js para manejar GET/POST y almacenar datos en Netlify Blobs.
- netlify.toml para configuración.

Cada vez que un usuario agrega miembros o vacaciones, se guarda en el backend y se muestra a todos.
