const { ObjectId } = require('mongodb');
const { getUsersCollection, isMongoReady, generateUid } = require('../config/db');
const localStore = require('../storage/localStore');

function normalizeMongoUser(user) {
  if (!user) {
    return null;
  }

  return {
    id: user._id.toString(),
    email: user.email,
    password: user.password,
    name: user.name,
    phone: user.phone || '',
    wallet: Number(user.wallet || 0),
    uid: user.uid || null,
    avatar: user.avatar || null,
    kyc_verified: Boolean(user.kyc_verified),
    created_at: user.created_at || null,
    updated_at: user.updated_at || null
  };
}

async function findByEmail(email) {
  if (isMongoReady()) {
    const usersCollection = getUsersCollection();
    const user = await usersCollection.findOne({ email: email.toLowerCase() });
    return normalizeMongoUser(user);
  }

  return localStore.findUserByEmail(email);
}

async function findById(id) {
  if (isMongoReady()) {
    const usersCollection = getUsersCollection();

    if (!ObjectId.isValid(id)) {
      return null;
    }

    const user = await usersCollection.findOne({ _id: new ObjectId(id) });
    return normalizeMongoUser(user);
  }

  return localStore.findUserById(id);
}

async function createUser({ email, password, name, phone }) {
  if (isMongoReady()) {
    const usersCollection = getUsersCollection();
    const normalizedEmail = email.toLowerCase();
    const existing = await usersCollection.findOne({ email: normalizedEmail });

    if (existing) {
      return null;
    }

    const now = new Date();
    const user = {
      email: normalizedEmail,
      password,
      name,
      phone,
      wallet: 0,
      uid: generateUid(),
      avatar: null,
      kyc_verified: false,
      created_at: now,
      updated_at: now
    };

    const result = await usersCollection.insertOne(user);

    return normalizeMongoUser({ ...user, _id: result.insertedId });
  }

  return localStore.createUser({ email, password, name, phone });
}

module.exports = {
  findByEmail,
  findById,
  createUser
};