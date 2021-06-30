require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');

const routes = require('./routes/routes');

const PORT = process.env.PORT || 3030;

// setting up swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Shopping cart APIs',
      version: '1.0.0',
      description: 'Simple shopping cart library API'
    },
    servers: [
        {
            url: `http://localhost:${PORT}/`
        }
    ],
  },
  apis: [`${__dirname}/routes/*.js`], // files containing annotations as above
};

const specs = swaggerJsdoc(options);

const app = express();

app.use(express.json());
app.use(logger('dev'));
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/v1', routes);

// when wrong url path is entered
app.use((req, res) => {
    res.status(404).send({message: '404: Url path not found'})
})

// for testing
module.exports = app;