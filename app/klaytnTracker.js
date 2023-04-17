//Connect with mongoDB
require('../database/app');
const { setWebsoketProvider, connectWebSocekt } = require('../src/provider');
const { buyTrack, listingTrack, cancelTrack, blockTrack } = require('../src/tracker');

//Make Provider & MarketContract by chain name
const { provider, web3, marketContract } = setWebsoketProvider('klaytn');

// connect to websocket
connectWebSocekt(provider);

// get blocknumber
blockTrack(web3);

// subscribe each event
listingTrack('klaytn', marketContract);
buyTrack('klaytn', marketContract);
cancelTrack('klaytn', marketContract);
