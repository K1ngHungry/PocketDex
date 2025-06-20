const pool = require('./db');
const bcrypt = require('bcrypt');

async function getUsers() {
  const [rows] = await pool.query('SELECT * FROM users');
  return rows;
}
async function getUserById(user_id) {
  const [rows] = await pool.query('SELECT * FROM users WHERE user_id = ?', [user_id]);
  return rows;
}

async function getUserByName(username) {
  const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
}

async function addUser(username, password) {
  const pw_hash = await bcrypt.hash(password, 10);
  await pool.query(
    `INSERT INTO users (username, pw_hash) VALUES (?, ?)`,
    [username, pw_hash]
  );
}

async function removeUser(user_id) {
  await pool.query(
    `DELETE FROM users WHERE user_id = ?`,
    [user_id]
  );
}

async function authUser(username, password) {
  const user = await getUserByName(username);
  console.log(user);
  if (!user) return { success: false, message: 'User not found' };

  const match = await bcrypt.compare(password, user.pw_hash);
  if (!match) return { success: false, message: 'Incorrect password' };

  return { success: true, user_id: user.user_id, username: user.username };
}

module.exports = { getUsers, getUserById, getUserByName, addUser, removeUser, authUser };