'use strict';
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

require('./routes')(app);

const PORT = process.env.PORT || 8008;
app.set('port', PORT);

app.listen(PORT, (err) => {
    if(err) 
        console.log(err);
    else {
        console.log(`Environment: ${process.env.NODE_ENV}`);
        console.log(`Listening on port: ${PORT}`)    
    }    
});

module.exports = app;

