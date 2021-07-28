'use strict';
require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const routes = require('./routes');
const cors = require('cors');
const connectDB = require('./config/database');

/** initial app and port */
const app = express();
const PORT = process.env.PORT || 3000;

/** use cors */
app.use(cors());

/** use body parser */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** default route */
app.get('/', (req, res, next) => {
    res.send({
        status: 200,
        message: 'Welcome to the app index page.'
    });
});
app.use('/api', routes);

/** Listening server on port: 3000 */
let server = app.listen(PORT, () => {
    connectDB();
    console.log(chalk.blue(`Server listening on port:${PORT}`));
});

module.exports = server;
