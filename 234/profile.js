const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/students',);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});


app.use(express.static(__dirname));

// Create a new API endpoint to fetch user data
app.get('/api/user', (req, res) => {
    db.collection('datas').findOne({
        "name": "Priz98",

    }, function(err, doc) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Error fetching user data' });
        } else {
            const userData = {
                username: doc.name,
                email: doc.email,
                password: doc.password
            };
            res.send(userData);
        }
    });
});

app.get('/profile', (req, res) => {
  res.sendFile(__dirname + '/profile.html');
});

app.listen(3019, function() {
  console.log('Server listening on port 3019');
});
