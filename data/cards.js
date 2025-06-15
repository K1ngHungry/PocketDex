const pool = require('./db');

async function getCards() {
  const [cards] = await pool.query('SELECT * FROM cards');
  return cards;
}

async function getSelectCards({set_id, type, stage, rarity, search, sortby}) {
  let q = 'SELECT * FROM cards WHERE 1=1';
  const params = [];
  if (set_id && set_id != "") {
    q += ' AND set_id = ?';
    params.push(set_id);
  }
  if (type && type != "") {
    q += ' AND type = ?';
    params.push(type);
  }
  if (stage && stage != "") {
    q += ' AND stage = ?';
    params.push(stage);
  }
  if (rarity && rarity != "") {
    q += ' AND rarity = ?';
    params.push(rarity);
  }
  if (search && search != "") {
    q += ' AND name LIKE ?';
    params.push(`%${search}%`);
  }

    // Optional sorting
  const sortOptions = {
    'set-number': 'set_id, set_number', 
    'name': 'name', 
    'type': 
        `CASE type
            WHEN 'Grass' THEN 0
            WHEN 'Fire' THEN 1
            WHEN 'Water' THEN 2
            WHEN 'Lightning' THEN 3
            WHEN 'Psychic' THEN 4
            WHEN 'Fighting' THEN 5
            WHEN 'Darkness' THEN 6
            WHEN 'Metal' THEN 7
            WHEN 'Dragon' THEN 8
            WHEN 'Colorless' THEN 9
            WHEN 'Item' THEN 10
            WHEN 'Supporter' THEN 11
            WHEN 'Tool' THEN 12
            ELSE 13
        END`, 
    'rarity-ascending': 
        `CASE rarity
            WHEN '\u25ca' THEN 0
            WHEN '\u25ca\u25ca' THEN 1
            WHEN '\u25ca\u25ca\u25ca' THEN 2
            WHEN '\u25ca\u25ca\u25ca\u25ca' THEN 3
            WHEN '\u2606' THEN 4
            WHEN '\u2606\u2606' THEN 5
            WHEN '\u2606\u2606\u2606' THEN 6
            WHEN 'Crown Rare' THEN 7
            WHEN '' THEN 8
            ELSE 9
        END ASC`,
    'rarity-descending': 
        `CASE rarity
            WHEN '\u25ca' THEN 0
            WHEN '\u25ca\u25ca' THEN 1
            WHEN '\u25ca\u25ca\u25ca' THEN 2
            WHEN '\u25ca\u25ca\u25ca\u25ca' THEN 3
            WHEN '\u2606' THEN 4
            WHEN '\u2606\u2606' THEN 5
            WHEN '\u2606\u2606\u2606' THEN 6
            WHEN 'Crown Rare' THEN 7
            WHEN '' THEN 8
            ELSE 9
        END DESC`
  };

  if (sortby && sortOptions[sortby]) {
    q += ` ORDER BY ${sortOptions[sortby]}, set_id, set_number`;
  }

  const [cards] = await pool.query(q, params);
  return cards;
}
async function getCardsByIds(card_ids) {
  if (!card_ids || card_ids.length === 0) return [];

  const conditions = card_ids.map(() => '(set_id = ? AND set_number = ?)').join(' OR ');
  const values = card_ids.flatMap(({ set_id, set_number }) => [set_id, set_number]);

  const [cards] = await pool.query(`SELECT * FROM cards WHERE ${conditions}`, values);
  return cards;
}

// (async () => {
//   const cards = await getSelectCards({ set_id: 'A1', rarity: '\u2606\u2606', search: "char", sortby: 'type'});
//   console.log(cards);
// })();

module.exports = { getCards, getSelectCards, getCardsByIds };