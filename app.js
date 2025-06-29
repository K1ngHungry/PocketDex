require('dotenv').config();

const express = require("express");
const session = require('express-session');
const app = express();
const setRoutes = require("./routes/sets_api");
const cardRoutes = require("./routes/cards_api");
const wListRoutes = require("./routes/wishlist_api");
const authRoutes = require("./routes/auth_api");
const packRoutes = require('./routes/packs_api');

app.use(express.static('public'));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',   
    secure: process.env.NODE_ENV === 'production'                    // set to true if using HTTPS
  }
}));

app.use('/sets', setRoutes);
app.use('/cards', cardRoutes);
app.use('/wishlist', wListRoutes);
app.use('/auth', authRoutes);
app.use('/packs', packRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running at ${process.env.PORT}`);
});