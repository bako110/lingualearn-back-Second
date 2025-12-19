const swaggerJsdoc = require('swagger-jsdoc');
const { appConfig } = require('./appConfig');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'LinguaLearn Authentication API',
      version: '1.0.0',
      description: 'Authentication Backend API with Node.js, Express, Prisma and JWT',
      contact: {
        name: 'API Support',
        email: 'support@lingualearn.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${appConfig.port}/api/${appConfig.apiVersion}`,
        description: 'Development server',
      },
      {
        url: `${process.env.API_URL || 'https://api.lingualearn.com'}/api/${appConfig.apiVersion}`,
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT Authorization header using the Bearer scheme',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    './src/modules/auth/auth.routes.js',
    './src/modules/user/user.routes.js',
  ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
