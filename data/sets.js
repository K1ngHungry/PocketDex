const pool = require('./db');

async function getSets() {
  const [rows] = await pool.query('SELECT * FROM sets');
  return rows;
}
async function getSet(id) {
  const [rows] = await pool.query('SELECT * FROM sets WHERE set_id = ?', [id]);
  return rows;
}

// (async () => {
//   const sets = await getSet('A1');
//   console.log(sets);
// })();

module.exports = { getSets, getSet };