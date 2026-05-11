const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');
const userRepository = require('../repositories/userRepository');

function buildUserResponse(user) {
  return {
    id: user.id?.toString() || user._id?.toString() || null,
    email: user.email,
    name: user.name,
    phone: user.phone || '',
    wallet: Number(user.wallet || 0),
    uid: user.uid || null,
    avatar: user.avatar || null,
    kyc_verified: Boolean(user.kyc_verified)
  };
}

async function login(email, password) {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    return null;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return null;
  }

  const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
    expiresIn: '7d'
  });

  return {
    token,
    user: buildUserResponse(user)
  };
}

async function signup({ email, password, name, phone }) {
  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    return null;
  }

  const user = await userRepository.createUser({ email, password, name, phone });

  if (!user) {
    return null;
  }

  const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
    expiresIn: '7d'
  });

  return {
    token,
    user: buildUserResponse(user)
  };
}

async function getCurrentUser(id) {
  const user = await userRepository.findById(id);

  if (!user) {
    return null;
  }

  return buildUserResponse(user);
}

module.exports = {
  login,
  signup,
  getCurrentUser
};