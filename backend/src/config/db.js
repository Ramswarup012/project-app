const bcrypt = require('bcryptjs');
const { MongoClient } = require('mongodb');
const { mongoUri, mongoDbName, useMongo } = require('./env');
const localStore = require('../storage/localStore');

let client = null;
let db = null;
let usersCollection = null;
let databaseMode = 'local';

function generateUid() {
  return `PB${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0')}`;
}

async function initializeDatabase() {
  if (!useMongo || !mongoUri) {
    client = null;
    db = null;
    usersCollection = null;
    databaseMode = 'local';
    await localStore.ensureStore();
    return databaseMode;
  }

  try {
    client = new MongoClient(mongoUri);
    await client.connect();

    db = client.db(mongoDbName);
    usersCollection = db.collection('users');

    await usersCollection.createIndex({ email: 1 }, { unique: true });
    await usersCollection.createIndex({ uid: 1 }, { unique: true, sparse: true });

    const existingCount = await usersCollection.countDocuments();

    if (existingCount === 0) {
      const testPassword = await bcrypt.hash('test123', 10);
      await usersCollection.insertOne({
        email: 'test@example.com',
        password: testPassword,
        name: 'Test User',
        phone: '9999999999',
        wallet: 0,
        uid: 'PB100001',
        avatar: null,
        kyc_verified: false,
        created_at: new Date(),
        updated_at: new Date()
      });
    }

    databaseMode = 'mongodb';
    return databaseMode;
  } catch (error) {
    console.warn('MongoDB unavailable, using local auth store:', error.message);
    client = null;
    db = null;
    usersCollection = null;
    databaseMode = 'local';
    await localStore.ensureStore();
    return databaseMode;
  }
}

function getUsersCollection() {
  return usersCollection;
}

function isMongoReady() {
  return useMongo && databaseMode === 'mongodb' && Boolean(usersCollection);
}

function getDatabaseMode() {
  return databaseMode;
}

module.exports = {
  initializeDatabase,
  getUsersCollection,
  isMongoReady,
  getDatabaseMode,
  generateUid
};