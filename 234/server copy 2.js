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
   password: String,
   petname: String,
   pettype: String,
   petage: Number,
   petgender: String,
   petdescription: String
});

const Users = mongoose.model("data", userSchema);

// Routes
app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Serve new3.html on root
});

app.get('/new3', (req, res) => {
  res.sendFile(path.join(__dirname, 'new3.html'));
});

app.post('/post', async (req, res) => {

  
    console.log(req.body);
    const { name, email, password } = req.body;
    try{
    const existingUser = await Users.findOne({ name });
    if (existingUser) {
        return res.status(400).redirect("/new3");
    }
    const user = new Users({
      name,
      email,
      password
    })
    await user.save();
    res.status(201).redirect('/index');
    }catch(error) {
      console.error("Error during signup:", error);
      res.status(500).send("Internal Server Error"); // Handle server errors
  }

});



app.post('/login', async (req, res) => {
  const { name, password } = req.body;
  
  try {
    const user = await Users.findOne({ name });
    if (!user || user.password !== password) {
        return res.status(401).send("Incorrect username or password");
    }
    res.status(200).render("/index"); // Assuming you have a home template to render
} catch (e) {
    res.status(500).send("Server error");
}
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
