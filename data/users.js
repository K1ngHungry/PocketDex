const pool = require('./db');

async function getUsers() {
  const [rows] = await pool.query('SELECT * FROM users');
  return rows;
}
async function getUser(user_id) {
  const [rows] = await pool.query('SELECT * FROM users WHERE user_id = ?', [user_id]);
  return rows;
}

async function addUser(username, pw_hash) {
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
// (async () => {
//   const sets = await getSet('A1');
//   console.log(sets);
// })();

module.exports = { getUsers, getUser, addUser, removeUser };