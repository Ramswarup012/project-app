const fs = require('fs/promises');
const path = require('path');
const bcrypt = require('bcryptjs');

const storeDir = path.join(__dirname, '..', '..', 'data');
const storeFile = path.join(storeDir, 'auth-store.json');

function nowIso() {
  return new Date().toISOString();
}

function nextUid(id) {
  return `PB${String(100000 + id).padStart(6, '0')}`;
}

async function defaultState() {
  const password = await bcrypt.hash('test123', 10);

  return {
    lastId: 1,
    users: [
      {
        id: 1,
        email: 'test@example.com',
        password,
        name: 'Test User',
        phone: '9999999999',
        wallet: 0,
        uid: 'PB100001',
        avatar: null,
        kyc_verified: 0,
        created_at: nowIso(),
        updated_at: nowIso()
      }
    ]
  };
}

async function readState() {
  try {
    const raw = await fs.readFile(storeFile, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    const state = await defaultState();
    await ensureStore(state);
    return state;
  }
}

async function writeState(state) {
  await fs.mkdir(storeDir, { recursive: true });
  await fs.writeFile(storeFile, JSON.stringify(state, null, 2), 'utf8');
}

async function ensureStore(existingState) {
  if (existingState) {
    await writeState(existingState);
    return existingState;
  }

  const state = await defaultState();
  await writeState(state);
  return state;
}

async function findUserByEmail(email) {
  const state = await readState();
  return state.users.find((user) => user.email.toLowerCase() === email.toLowerCase()) || null;
}

async function findUserById(id) {
  const state = await readState();
  return state.users.find((user) => user.id === Number(id)) || null;
}

async function createUser({ email, password, name, phone }) {
  const state = await readState();
  const existing = state.users.find((user) => user.email.toLowerCase() === email.toLowerCase());

  if (existing) {
    return null;
  }

  const nextId = state.lastId + 1;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    id: nextId,
    email,
    password: hashedPassword,
    name,
    phone,
    wallet: 0,
    uid: nextUid(nextId),
    avatar: null,
    kyc_verified: 0,
    created_at: nowIso(),
    updated_at: nowIso()
  };

  state.lastId = nextId;
  state.users.push(user);
  await writeState(state);

  return user;
}

module.exports = {
  ensureStore,
  findUserByEmail,
  findUserById,
  createUser
};