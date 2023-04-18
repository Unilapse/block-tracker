//Connect with mongoDB
require('../database/app');
const { setWebsoketProvider, connectWebSocekt } = require('../src/provider');
const { buyTrack, listingTrack, cancelTrack, blockTrack } = require('../src/tracker');

//Make Provider & MarketContract by chain name
const { provider, web3, marketContract } = setWebsoketProvider('bsc');

// connect to websocket
connectWebSocekt(provider, 'bsc');

// get blocknumber
blockTrack(web3);

// subscribe each event
listingTrack('bsc', marketContract);
buyTrack('bsc', marketContract);
cancelTrack('bsc', marketContract);
