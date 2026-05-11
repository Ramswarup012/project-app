-- ProBattle Database Setup

CREATE DATABASE IF NOT EXISTS probattle;
USE probattle;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  wallet DECIMAL(10, 2) DEFAULT 0,
  uid VARCHAR(50) UNIQUE,
  avatar VARCHAR(255),
  kyc_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tournaments Table
CREATE TABLE IF NOT EXISTS tournaments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  game_mode VARCHAR(50) NOT NULL,
  entry_fee DECIMAL(10, 2) NOT NULL,
  prize_pool DECIMAL(12, 2) NOT NULL,
  max_players INT NOT NULL,
  current_players INT DEFAULT 0,
  scheduled_time DATETIME NOT NULL,
  status VARCHAR(20) DEFAULT 'open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tournament Participants Table
CREATE TABLE IF NOT EXISTS participants (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tournament_id INT NOT NULL,
  user_id INT NOT NULL,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'joined',
  FOREIGN KEY (tournament_id) REFERENCES tournaments(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  type VARCHAR(20) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  balance_after DECIMAL(10, 2),
  description VARCHAR(255),
  status VARCHAR(20) DEFAULT 'completed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Referrals Table
CREATE TABLE IF NOT EXISTS referrals (
  id INT PRIMARY KEY AUTO_INCREMENT,
  referrer_id INT NOT NULL,
  referee_id INT,
  referral_link VARCHAR(255),
  reward_earned DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (referrer_id) REFERENCES users(id)
);

-- Sample Data
INSERT INTO users (email, password, name, phone, wallet) VALUES 
('test@example.com', '$2a$10$7JqnF1zxSYnR3.xfxH8kmu5hVqJ6mG8xD8K3zI9Q5zK5K5xZ9yJ5m', 'Test User', '9999999999', 1000);

SHOW TABLES;
