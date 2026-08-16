# Configurar el almacenamiento de votos

## 1. Crear la hoja

1. Crea una hoja de cálculo nueva en Google Sheets.
2. Copia el ID de la hoja desde la URL: `https://docs.google.com/spreadsheets/d/ESTE_ES_EL_ID/edit`.

## 2. Crear el endpoint

1. Abre **Extensiones → Apps Script** desde la hoja.
2. Copia el contenido de `google-apps-script/Code.gs` en el editor.
3. Sustituye `PASTE_GOOGLE_SHEET_ID_HERE` por el ID de tu hoja.
4. Ejecuta `doGet` una vez y acepta los permisos.
5. Pulsa **Implementar → Nueva implementación → Aplicación web**.
6. Selecciona **Ejecutar como: Yo** y **Quién tiene acceso: Cualquier usuario**.
7. Copia la URL de la aplicación web.

## 3. Conectar las páginas

Abre `vote-config.js` y reemplaza:

```js
window.XP_VOTE_ENDPOINT = 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
```

por la URL copiada. Después, publica de nuevo la carpeta `LandingPages`.

Los votos guardan idea, puntuación de 1 a 5, nombre, email, mensaje, página y fecha. La puntuación es obligatoria; los demás campos son opcionales.
