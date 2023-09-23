// Require mongoose for connection
const { connect, connection } = require('mongoose');

// Connection string to accomodate if using Heroku application.
// Otherwise assume running this application locally
// Use socialUserDB
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialUserDB';

connect(connectionString);

// Export connection
module.exports = connection;
