// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Set up Express App
const app = express();
const PORT = process.env.PORT || 3050;

// Set up Express App to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Router
require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes')(app);

// Listener
app.listen(PORT, function() {
  console.log(`App listening on PORT ${PORT}`);
});
