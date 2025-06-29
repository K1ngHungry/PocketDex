let setsMap = new Map();  // id → { name, release_date, … }

async function loadSets() {
  try {
    const res  = await fetch('/sets');
    const data = await res.json();  // Array of full set objects
    // build your Set of IDs
    const idSet = new Set(data.map(s => s.set_id));
    // also build a Map for lookups
    data.forEach(s => setsMap.set(s.set_id, s));
    return idSet;
  } catch (err) {
    console.error("Failed to load sets:", err);
    return new Set();
  }
}

// no more fetch per‐set needed:
function setName(set_id) {
  const s = setsMap.get(set_id);
  return s ? s.name : '';
}

async function loadPacks(set_id) {
  try {
    const res  = await fetch(`/packs/${set_id}`);
    const data = await res.json();
    return data;
  } 
  catch (err) {
    console.error('Failed to load packs:', err);
    return [];
  }
}