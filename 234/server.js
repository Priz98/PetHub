const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3019;

const app = express();
app.use(express.json());
// Serve static files from the current directory
app.use(express.static(__dirname)); // This will serve HTML, CSS, and JS files

app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/students');
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// User schema
const userSchema = new mongoose.Schema({
   name: String,
   email: String,
   password: String
});

const Users = mongoose.model("data", userSchema);

// Routes
app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Serve new3.html on root
});


app.get('/new3', (req, res) => {
  res.sendFile(path.join(__dirname, 'new3.html'));
});

app.get('/new10', (req, res) => {
  res.sendFile(path.join(__dirname, 'new10.html'));
});

app.post('/post', async (req, res) => {
 
    console.log(req.body);
    const { name, email, password } = req.body;
    const user = new Users({
      name,
      email,
      password
    })
    await user.save();
    res.redirect('/index');
  
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
