// api/index.js
const serverless = require('serverless-http');
const app = require('../main'); // path to exported Express app
module.exports = serverless(app);
