const express = require("express");
const path = require("path");
const fs = require("fs");

// Listening on port 3000
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Connecting route
require('./routes/routes')(app);

// Funciton is being used to listen and bind connections
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
}); 