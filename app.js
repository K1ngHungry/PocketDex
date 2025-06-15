const express = require("express");
const app = express();
const setRoutes = require("./routes/sets_api");
const cardRoutes = require("./routes/cards_api");
const wListRoutes = require("./routes/wishlist_api");

app.use(express.static('public'));

app.use(express.json());
app.use('/sets', setRoutes);
app.use('/cards', cardRoutes);
app.use('/wishlist', wListRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});