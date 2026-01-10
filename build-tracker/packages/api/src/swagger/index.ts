import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';
import fs from 'fs';
import path from 'path';

const openApiPath = path.join(__dirname, 'openapi.yaml');
const openApiDocument = YAML.parse(fs.readFileSync(openApiPath, 'utf8'));

export const swaggerServe = swaggerUi.serve;
export const swaggerSetup = swaggerUi.setup(openApiDocument, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Build Tracker API Documentation',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
    tryItOutEnabled: true,
  },
});

export { openApiDocument };
