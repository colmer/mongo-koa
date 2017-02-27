const config = require('config');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

mongoose.set('debug', true);

mongoose.connect(
    config.get('databasePath'),
    config.get('connectionConfig')
);

module.exports = mongoose;
