//Connect with mongoDB
require('../database/app');
const { setWebsoketProvider, connectWebSocekt } = require('../src/provider');
const { buyTrack, listingTrack, cancelTrack, blockTrack } = require('../src/tracker');

//Make Provider & MarketContract by chain name
const { provider, web3, marketContract } = setWebsoketProvider('polygon');

// connect to websocket
connectWebSocekt(provider, 'polygon');

// get blocknumber
blockTrack(web3);

// subscribe each event
listingTrack('polygon', marketContract);
buyTrack('polygon', marketContract);
cancelTrack('polygon', marketContract);
