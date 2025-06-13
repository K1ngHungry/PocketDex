const express = require("express");
const app = express();
const setRoutes = require("./routes/sets_api");
const cardRoutes = require("./routes/cards_api");

app.use(express.static('public'));

app.use(express.json());
app.use('/sets', setRoutes);
app.use('/cards', cardRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});