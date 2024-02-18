const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:3000/api/transaction',
});

module.exports = api;
