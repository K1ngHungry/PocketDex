const express = require("express");
const session = require('express-session');
const app = express();
const setRoutes = require("./routes/sets_api");
const cardRoutes = require("./routes/cards_api");
const wListRoutes = require("./routes/wishlist_api");
const authRoutes = require("./routes/auth_api");

app.use(express.static('public'));
app.use(express.json());
app.use(session({
  secret: 'your_secret_key',         // 🔒 use an environment variable in production
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',                 // or 'strict' for stronger CSRF protection
    secure: false                    // set to true if using HTTPS
  }
}));

app.use('/sets', setRoutes);
app.use('/cards', cardRoutes);
app.use('/wishlist', wListRoutes);
app.use('/auth', authRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});