const route = require('express').Router();

const { handleNewShortUrl, handleGetShortUrl} = require('../controllers/url');

route.post('/', handleNewShortUrl);
route.get('/:shortId', handleGetShortUrl);


module.exports = route;