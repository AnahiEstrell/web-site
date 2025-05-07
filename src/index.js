const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
const routes = require('./routes/routes');
const PORT = process.env.PORT || 3000;

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
// Views
app.set('views', path.join(__dirname, 'views'));
// EJS
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(routes);
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})