const { createApp } = require('./app');
const { initializeDatabase, getDatabaseMode } = require('./src/config/db');
const { apiPort } = require('./src/config/env');


async function startServer() {
  await initializeDatabase();

  const app = createApp();
  app.listen(apiPort, () => {
    console.log(`ProBattle API running on http://localhost:${apiPort}`);
    console.log(`Database mode: ${getDatabaseMode()}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start ProBattle API:', error);
  process.exit(1);
});