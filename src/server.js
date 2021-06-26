require('dotenv').config();
const express = require('express');
const { port } = require('./config/config');

const { sequelize } = require('./database/models');
const routes = require('./routes/routes');

const PORT = process.env.PORT || 3030;

const app = express();

app.use(express.json());

app.use('/api/v1', routes);

// when wrong url path is entered
app.use((req, res) => {
    res.status(404).send({message: '404: Url path not found'})
})

app.listen(PORT, async () => {
    console.log(`Shopping cart server running on port ${port}`);
    await sequelize.authenticate();
    console.log("Database connected");
})