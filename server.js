const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const PORT = 3000;

// Configure MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // Replace with your MySQL username
  password: 'Admin',      // Replace with your MySQL password
  database: 'loginApp' // Replace with your MySQL database name
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');  // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views'));  // Set the views directory

app.use(session({
  secret: 'your_secret_key',  // Use a strong secret key in production
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 } // 1 minute for demo (you can increase this)
}));

// Middleware to make session data available in views
app.use((req, res, next) => {
  res.locals.username = req.session.user ? req.session.user.username : null;
  next();
});

// Routes

// Home route (set the landing page as /weather)
app.get('/', (req, res) => {
  res.redirect('/weather');  // Redirect to the weather page as the landing page
});

// Register route (GET)
app.get('/register', (req, res) => {
  res.render('register');  // Render the register.ejs page
});

// Weather route (no login required)
app.get('/weather', (req, res) => {
  res.render('weather');  // Render the weather page
});

// Other Routes (no login required)
app.get('/weatheral', (req, res) => {
  res.render('weatheral');  // Render the weather alert page
});

app.get('/forecast', (req, res) => {
  res.render('forecast');  // Render the forecast page
});

app.get('/contact', (req, res) => {
  res.render('contact');  // Render the contact page
});

app.get('/comparison', (req, res) => {
  res.render('comparison');  // Render the comparison page
});

app.get('/news', (req, res) => {
  res.render('news');  // Render the comparison page
});

app.get('/about', (req, res) => {
  res.render('about');  // Render the comparison page
});



// Register route (POST)
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Hash the password before saving it to the database
  const passwordHash = await bcrypt.hash(password, 10);

  // Insert user data into the MySQL database
  db.query('INSERT INTO users (username, passwordHash) VALUES (?, ?)', [username, passwordHash], (err, results) => {
    if (err) {
      console.error(err);
      res.send('Error during registration. Try a different username.');
    } else {
      res.send('<h1>Registration successful!</h1><a href="/login">Login</a>');
    }
  });
});

// Login route (GET)
app.get('/login', (req, res) => {
  res.render('login');  // Render the login.ejs page
});

// Login route (POST)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the username exists in the database
  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err || results.length === 0 || !(await bcrypt.compare(password, results[0].passwordHash))) {
      res.send('<h1>Login failed</h1><a href="/login">Try again</a>');
    } else {
      // Store the user in the session after successful login
      req.session.user = results[0];
      res.redirect('/weather');  // Redirect to the weather page after login
    }
  });
});

// Logout route
app.get('/logout', (req, res) => {
  // Destroy the session when the user logs out
  req.session.destroy(() => {
    res.redirect('/');  // Redirect to the home page (which redirects to /weather)
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
