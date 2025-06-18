const pool = require('./db');

async function getWlists() {
  const [rows] = await pool.query('SELECT * FROM wishlists');
  return rows;
}
async function getUserWlist(user_id) {
  const [rows] = await pool.query('SELECT * FROM wishlists WHERE user_id = ?', [user_id]);
  return rows;
}

async function addToWlist(user_id, set_id, set_number) {
    console.log("Adding");
  await pool.query(
    `INSERT IGNORE INTO wishlists (user_id, set_id, set_number) VALUES (?, ?, ?)`,
    [user_id, set_id, set_number]
  );
}

async function removeFromWlist(user_id, set_id, set_number) {
  await pool.query(
    `DELETE FROM wishlists WHERE user_id = ? AND set_id = ? AND set_number = ?`,
    [user_id, set_id, set_number]
  );
}

// (async () => {
//   const sets = await getSet('A1');
//   console.log(sets);
// })();

module.exports = { getWlists, getUserWlist, addToWlist, removeFromWlist };