const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const cors = require("cors")
const User = require('./models/User'); // Ensure model is imported
const Role = require('./models/Role');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors())
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 3000;

const seedRoles = async () => {
    const roles = ['developer', 'customer'];
    for (const role of roles) {
      await Role.findOrCreate({ where: { name: role } });
    }
}

// Sync database and start server
sequelize
  .sync({ force: false }) // Set to `true` to drop and recreate tables on every restart
  .then(async () => {
    console.log('Database synced successfully.');
    await seedRoles();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.error('Error syncing database:', error.message));
