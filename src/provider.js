const Web3 = require('web3');
const fs = require('fs');
const marketContractABI = JSON.parse(fs.readFileSync('../tokenSalesABI', 'utf8'));
const { writeErrorLogConnection } = require('./logAction');
const { MarketContract, SocketEndpoint } = require('../constants');

const chainEndpointMap = {
  klaytn: {
    endPoint: SocketEndpoint.Klaytn,
    marketContractAddress: MarketContract.Klaytn,
    providerOptions: {
      timeout: 50000, // ms
      headers: {
        authorization: `Basic ${process.env.ZSH_KAS_AUTH}`,
      },
      clientConfig: {
        keepalive: true,
        keepaliveInterval: 60000, // ms
      },
      reconnect: {
        auto: true,
        delay: 3000, // ms
        maxAttempts: 5,
        onTimeout: false,
      },
    },
  },
  polygon: {
    endPoint: SocketEndpoint.Polygon,
    marketContractAddress: MarketContract.Polygon,
    providerOptions: {
      timeout: 30000, // ms
      clientConfig: {
        keepalive: true,
        keepaliveInterval: 60000, // ms
      },
      reconnect: {
        auto: true,
        delay: 5000, // ms
        maxAttempts: 5,
        onTimeout: false,
      },
    },
  },
  bsc: {
    endPoint: SocketEndpoint.Bsc,
    marketContractAddress: MarketContract.Bsc,
    providerOptions: {
      timeout: 30000, // ms
      clientConfig: {
        keepalive: true,
        keepaliveInterval: 60000, // ms
      },
      reconnect: {
        auto: true,
        delay: 5000, // ms
        maxAttempts: 5,
        onTimeout: false,
      },
    },
  },
};

function setWebsoketProvider(chain) {
  const { endPoint, marketContractAddress, providerOptions } = chainEndpointMap[chain];
  const provider = new Web3.providers.WebsocketProvider(endPoint, providerOptions);
  const web3 = new Web3(provider);
  const marketContract = new web3.eth.Contract(marketContractABI, marketContractAddress);

  return { provider, web3, marketContract };
}

function connectWebSocekt(provider, chain) {
  function connect() {
    provider.on('connect', () => {
      console.log(`Websocket connected : ${chain}`);
    });

    provider.on('close', (event) => {
      console.log(event);
      console.log('Websocket closed. Reconnecting...');
      writeErrorLogConnection(event, chain);
      setTimeout(() => connect(), 1000);
    });

    provider.on('error', (error) => {
      writeErrorLogConnection(error, chain);
    });
  }
  connect();
}

module.exports = { setWebsoketProvider, connectWebSocekt };
