const app = require('./server.js');
const { sequelize } = require('./database/models');

const PORT = process.env.PORT || 3030;


app.listen(PORT, async () => {
    console.log(`Shopping cart server running on port ${PORT}`);
    await sequelize.authenticate();
    console.log("Database connected");
})