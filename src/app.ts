import cors from 'cors';
import tipoDocumentoRoute from './routes/tipoDocumentoRoute';
import env from './config/env';
import express, { Application } from 'express';
import clienteRoute from './routes/clienteRoute';
import contactoRoute from './routes/contactoRoute';
import oportunidadRoute from './routes/oportunidadRoute';
import interaccionRoute from './routes/interaccionRoute';
import tareaRoute from './routes/tareaRoute';
import usuarioRoute from './routes/usuarioRoute';
import swaggerUi from 'swagger-ui-express';
import authRouter from './routes/authRouter';
import { swaggerSpec } from './docs/swagger';

// CONFIGURAR CONEXION A BD, RUTAS Y OTRAS COSAS DE SERVICIO


const app: Application = express();
const PORT = process.env.PORT || 3000;


// Swagger
app.use(
  `${env.API_PREFIX}/api-docs`,
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
     customCss: `
      body {
        background-color: #f5f1e8 !important;
        color: #4a3c30 !important;
        font-family: 'Inter', 'Helvetica Neue', sans-serif;
      }

      .swagger-ui {
        background-color: #f5f1e8;
      }

      .swagger-ui .topbar {
        background-color: #6b4f37 !important;
        padding: 12px;
        border-bottom: 3px solid #8b5a2b !important;
      }

      .swagger-ui .topbar .topbar-wrapper {
        display: flex;
        align-items: center;
      }

      .swagger-ui .topbar .topbar-wrapper span {
        color: #f0e6d2 !important;
        font-weight: bold;
        font-size: 22px;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
        font-family: 'Playfair Display', serif;
      }

      .swagger-ui .info h1 {
        color: #6b4f37 !important;
        font-size: 30px;
        font-weight: 700;
        border-bottom: 2px dashed #c4a586 !important;
        padding-bottom: 10px;
        font-family: 'Playfair Display', serif;
      }

      .swagger-ui .info p {
        color: #6b4f37 !important;
        font-size: 15px;
      }

      .swagger-ui .info .base-url {
        font-family: monospace;
        background: rgba(139, 90, 43, 0.1);
        padding: 4px 8px;
        border-radius: 4px;
      }

      .swagger-ui .scheme-container {
        background: #e8d9c5 !important;
        color: #4a3c30 !important;
        box-shadow: 0 2px 4px rgba(107, 79, 55, 0.1);
        border: 1px solid #d4c4b0 !important;
      }

      .swagger-ui .opblock.opblock-get {
        background: rgba(107, 79, 55, 0.1) !important;
        border-color: #8b5a2b !important;
      }

      .swagger-ui .opblock.opblock-post {
        background: rgba(139, 90, 43, 0.1) !important;
        border-color: #6b4f37 !important;
      }

      .swagger-ui .opblock.opblock-delete {
        background: rgba(166, 84, 54, 0.1) !important;
        border-color: #a65436 !important;
      }

      .swagger-ui .opblock .opblock-summary-method {
        border-radius: 4px !important;
        font-weight: 600 !important;
        min-width: 80px;
        text-align: center;
      }

      .swagger-ui .btn.execute {
        background-color: #8b5a2b !important;
        border-color: #6b4f37 !important;
        color: #f0e6d2 !important;
        font-weight: bold;
        border-radius: 8px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .swagger-ui .btn {
        border-radius: 6px !important;
        font-weight: 600 !important;
        transition: all 0.3s ease;
      }

      .swagger-ui .btn:hover {
        opacity: 0.9;
        transform: translateY(-1px);
      }

      .swagger-ui .model-box,
      .swagger-ui .models {
        background-color: #f0e6d2 !important;
        color: #4a3c30 !important;
        border: 1px solid #d4c4b0 !important;
      }

      .swagger-ui input,
      .swagger-ui textarea {
        background-color: #fff !important;
        color: #4a3c30 !important;
        border: 1px solid #d4c4b0 !important;
        border-radius: 4px !important;
      }

      .swagger-ui .opblock .opblock-summary {
        border-left: 4px solid #8b5a2b !important;
      }

      .swagger-ui .opblock .opblock-summary:hover {
        background: rgba(139, 90, 43, 0.05) !important;
      }

      .swagger-ui .tab li {
        border-bottom: 2px solid transparent;
      }

      .swagger-ui .tab li.active {
        border-bottom: 2px solid #8b5a2b !important;
      }

      .swagger-ui .response-col_status {
        color: #8b5a2b !important;
      }

      .swagger-ui .response-col_links {
        color: #6b4f37 !important;
      }

      /* Añadir textura sutil */
      .swagger-ui .topbar {
        background-image: linear-gradient(to right, 
          rgba(107, 79, 55, 0.8), 
          rgba(139, 90, 43, 0.9)) !important;
      }
    `,
    customSiteTitle: 'API CRM - Estilo Rústico Moderno 🌾',

    customfavIcon: 'https://example.com/favicon-dark.ico'
  })
);


//base de datos 



//middleware para parear JSON 
app.use(express.json());
app.use(cors());



// Rutas o Routes

app.use(`${env.API_PREFIX}/tipo-documentos`, tipoDocumentoRoute);
app.use(`${env.API_PREFIX}/clientes`, clienteRoute);
app.use(`${env.API_PREFIX}/contactos`, contactoRoute);
app.use(`${env.API_PREFIX}/oportunidades`, oportunidadRoute);
app.use(`${env.API_PREFIX}/interacciones`, interaccionRoute);
app.use(`${env.API_PREFIX}/tareas`, tareaRoute);
app.use(`${env.API_PREFIX}/usuarios`, usuarioRoute);
app.use(`${env.API_PREFIX}/auth`, authRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Swagger docs en http://localhost:${PORT}/api-docs`);
});



export default app;