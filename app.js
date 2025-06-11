// server.js
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Serve frontend and data
app.use(express.static(path.join(__dirname, "public")));
app.use('/data', express.static(path.join(__dirname, 'data')));

// Mount the wishlist API router
const wishlistRoutes = require("./server/wishlist_api");
app.use("/api/wishlist", wishlistRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});