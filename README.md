# PocketDex 🎴

A comprehensive web application for browsing and managing Pokémon Trading Card Game (TCG) cards in the Pocket format. PocketDex provides an intuitive interface for card enthusiasts to explore sets, filter cards, and maintain personal wishlists.

## 🌟 Features

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

## 🏗️ Architecture

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

## 📋 Prerequisites

- **Node.js** (v14 or higher)
- **MySQL** (v8.0 or higher)
- **Python** (v3.7 or higher) - for data scraping
- **npm** or **yarn** package manager

## 🚀 Installation

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
Create a `.env` file in the root directory:
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_username
DB_PW=your_password
DB_NAME=pocketdex

# Session Configuration
SESSION_SECRET=your_session_secret_key
```

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

## 🎯 Usage

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

## 🗄️ Database Schema

### Tables
- **sets**: Set information (ID, name, release date, card count)
- **cards**: Card details (stats, type, stage, rarity, etc.)
- **attacks**: Individual attack data for Pokémon cards
- **users**: User authentication data
- **wishlists**: User-card relationships for wishlists

## 🔧 API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/signin` - User login
- `POST /auth/signout` - User logout
- `GET /auth/user` - Get current user info

### Cards
- `GET /cards` - Get filtered cards
- `POST /cards/batch` - Get cards by ID list

### Sets
- `GET /sets` - Get all sets
- `GET /sets/:id` - Get specific set

### Wishlists
- `GET /wishlist` - Get user's wishlist
- `POST /wishlist` - Add card to wishlist
- `DELETE /wishlist` - Remove card from wishlist

### Packs
- `GET /packs` - Get pack information

## 🎨 Customization

### Styling
Modify CSS files in `public/styles/` to customize the appearance:
- `style.css` - Global styles
- `nav.css` - Navigation bar styling
- `gallery.css` - Card gallery layout
- `auth.css` - Authentication page styling

### Adding New Sets
1. Update the set options in `public/gallery.html`
2. Run the scraping script to collect new card data
3. Import the data into the database

## 🔒 Security Features

- **Password Hashing**: Bcrypt for secure password storage
- **Session Management**: Secure session cookies with httpOnly flag
- **Input Validation**: Server-side validation for all user inputs
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Content Security Policy headers

## 🐛 Troubleshooting

### Common Issues

**Database Connection Error**
- Verify MySQL is running
- Check environment variables in `.env`
- Ensure database exists: `CREATE DATABASE pocketdex;`

**Port Already in Use**
- Change the PORT in `.env` file
- Kill existing processes: `lsof -ti:3000 | xargs kill`

**Missing Dependencies**
- Run `npm install` to install Node.js dependencies
- Install Python dependencies: `pip install requests beautifulsoup4 mysql-connector-python lxml`

## 🙏 Acknowledgments

- **Limitless TCG**: Card data and images sourced from [pocket.limitlesstcg.com](https://pocket.limitlesstcg.com)
- **Pokémon Company**: Pokémon TCG intellectual property
