const { connections } = require('./config/connections'); // Adjust the path according to your project structure

beforeAll(async () => {
  await sequelize.sync({ force: true }); // This will reset the database before tests
});

afterAll(async () => {
  await sequelize.close(); // Close the connection after tests
});

module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./jest.setup.js'],
    // other configurations
};