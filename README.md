# PocketDex 🎴

A comprehensive web application for browsing and managing Pokémon Trading Card Game (TCG) cards in Pocket. PocketDex provides an intuitive interface for card enthusiasts to explore sets, filter cards, and maintain personal wishlists.

## Features

### Card Gallery
- **Comprehensive Card Database**: Browse thousands of Pokémon TCG Pocket format cards
- **Advanced Filtering**: Filter by set, type, stage, and rarity
- **Search Functionality**: Find cards by name or description
- **Multiple Sort Options**: Sort by set number, name, type, or rarity
- **Responsive Design**: Optimized for desktop and mobile devices

### User Management
- **Secure Authentication**: User registration and login with password hashing
- **Session Management**: Persistent login sessions with secure cookies
- **Profile Management**: User-specific features and preferences

### Wishlist System
- **Personal Collections**: Add cards to your personal wishlist
- **Organized Viewing**: View wishlists by sets and packs
- **Easy Management**: Add and remove cards with simple interactions

## Architecture

### Backend
- **Node.js/Express**: RESTful API server
- **MySQL Database**: Relational database for card and user data
- **Session Management**: Express-session for user authentication
- **Modular Design**: Organized route structure for maintainability

### Frontend
- **Vanilla JavaScript**: No framework dependencies
- **Responsive CSS**: Modern styling with CSS Grid and Flexbox
- **Progressive Enhancement**: Works without JavaScript for basic functionality

### Data Collection
- **Custom Scraping**: Python-based web scraper for card data
- **Limitless TCG Integration**: Data sourced from pocket.limitlesstcg.com
- **Automated Updates**: Scripts for maintaining current card information

## Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd PocketDex
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory with the following variables:
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `DB_HOST` - Database host
- `DB_PORT` - Database port
- `DB_USER` - Database username
- `DB_PW` - Database password
- `DB_NAME` - Database name
- `SESSION_SECRET` - Secret key for session management


### 4. Database Setup
```bash
mysql -u your_username -p < data/schema.sql
```

### 5. Install Python Dependencies (for scraping)
```bash
cd scraping
pip install requirements.txt
```

### 6. Populate Database (Optional)
```bash
cd scraping
python limitless_scraper.py
```

## Usage

### Starting the Application
```bash
npm start
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
PocketDex/
├── app.js                 # Main Express server
├── data/                  # Database operations
│   ├── db.js             # Database connection
│   ├── schema.sql        # Database schema
│   ├── cards.js          # Card operations
│   ├── sets.js           # Set operations
│   ├── users.js          # User operations
│   └── wishlist.js       # Wishlist operations
├── routes/                # API endpoints
│   ├── auth_api.js       # Authentication
│   ├── cards_api.js      # Card data
│   ├── sets_api.js       # Set data
│   ├── wishlist_api.js   # Wishlist management
│   └── packs_api.js      # Pack information
├── public/                # Frontend files
│   ├── index.html        # Landing page
│   ├── gallery.html      # Card browsing
│   ├── wishlist.html     # Wishlist management
│   ├── signin.html       # Authentication
│   ├── signup.html       # Registration
│   ├── assets/           # Static assets
│   ├── scripts/          # Client-side JavaScript
│   └── styles/           # CSS stylesheets
└── scraping/              # Data collection scripts
    ├── limitless_scraper.py
    ├── CardInfo.py
    ├── SetInfo.py
    └── AttackInfo.py
```

## Database

The application uses a MySQL database with tables for sets, cards, attacks, users, and wishlists. The schema is defined in `data/schema.sql`.

## API

The application provides RESTful API endpoints for authentication, card management, set information, and wishlist functionality.

## Security

The application implements several security measures including password hashing, secure session management, input validation, and protection against common web vulnerabilities.

## Acknowledgments

- **Limitless TCG**: Card data and images sourced from [pocket.limitlesstcg.com](https://pocket.limitlesstcg.com)
- **Pokémon Company**: Pokémon TCG intellectual property
