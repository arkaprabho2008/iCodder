// Today we are going to make a Website using Pug

const mongoose = require('mongoose'); // Importing mongoose
mongoose.connect('mongodb://localhost/iCodderTest', { useNewUrlParser: true, useUnifiedTopology: true });
const express = require("express");// Importing express
const path = require("path");// Importing path
const bodyparser = require("body-parser");// Importing body-parser
const app = express();// Creating our express app
const port = 8000;// Defining port

// MONGOOSE SPECIFIC STUFF
// Defining mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    desc: String
});

const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));// Serving static files
app.use(express.urlencoded());// This will help to bring the form data to express

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // Setting the template engine as pug
app.set('views', path.join(__dirname, 'views')); // set the views directory


// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res) => {
    let myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("Item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database");
    });
    res.status(200).render('contact2.pug');
});// Our data would be saved to mongodb database





// STARTING THE SERVER
app.listen(port, () => {//Telling app to listen on port 80 and print the following statement
    console.log(`Our application successfully started on port ${port}`);
})
