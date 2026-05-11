require('dotenv').config();

const apiPort = Number(process.env.API_PORT || 3001);
const mongoUri = process.env.MONGODB_URI || '';
const mongoDbName = process.env.MONGODB_DB || 'probattle';
const useMongo = String(process.env.USE_MONGO || 'true').toLowerCase() !== 'false';

const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';

module.exports = {
  apiPort,
  jwtSecret,
  mongoUri,
  mongoDbName,
  useMongo
};