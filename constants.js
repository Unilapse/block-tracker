const NETWORK = process.env.ZSH_CHAIN;

function makeTime() {
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
}
const Chain = {
  KLAYTN: NETWORK === 'test' ? 1001 : 8217,
  ETH: NETWORK === 'test' ? 5 : 1,
  POLYGON: NETWORK === 'test' ? 80001 : 137,
  BSC: NETWORK === 'test' ? 97 : 56,
};

const NftAddress = {
  Klaytn: NETWORK === 'test' ? '0xc6C52dd1b241329649a11062D329f134D800a955' : '0xd8DADFF9fc48B1F347a66b14152090E9976EB98E',
  Polygon: NETWORK === 'test' ? '0xD926772CE7751f8183c315eaC27d699eb0ea652C' : '0x41f304D3a3Bf363360d5f82c21151087646faB9E',
  Bsc: NETWORK === 'test' ? '0x25DDB014Eeb61A3c8A069907d4F5C36A627960c5' : '0xb28846b610B41df993521Eb679bEe5dB45bc1473',
  Zero: '0x0000000000000000000000000000000000000000',
};

const MarketContract = {
  Klaytn: NETWORK === 'test' ? '0xb34C4319d007e0245B4715839d08f448fE42eA09' : '0x03488dbEdE125106d67216a32A1746fce7947132',
  Polygon: NETWORK === 'test' ? '0x11f46E8C1E2Ac861e662A62080ED6dC63041Ff94' : '0x79B9279803c179220A6A78781554B6D62861d812',
  Bsc: NETWORK === 'test' ? '0x23db713F8539aB8B18AC4A14794e4Ea66469936B' : '0x5D6be6B9179372ecC98b460A7C58bF292f67D9b6',
};

const SocketEndpoint = {
  Klaytn: NETWORK === 'test' ? `wss://node-api.klaytnapi.com/v1/ws/open?chain-id=1001` : 'wss://node-api.klaytnapi.com/v1/ws/open?chain-id=8217',
  Polygon: NETWORK === 'test' ? `wss://polygon-mumbai.g.alchemy.com/v2/${process.env.ZSH_POLYGON_API_KEY}` : `wss://polygon-mainnet.g.alchemy.com/v2/${process.env.ZSH_POLYGON_API_KEY}`,
  Bsc: NETWORK === 'test' ? `wss://ws-nd-057-809-208.p2pify.com/${process.env.ZSH_BSC_API_KEY}` : `wss://ws-nd-120-875-210.p2pify.com/${process.env.ZSH_BSC_API_KEY}`,
};

const LogMessage = {
  /**
   * Success Message
   */
  itemSuccess: (state, address, tokenId) => {
    const now = makeTime();
    return `${now} // ${state} Item update on mongoDB successful : Contrart ${address} // tokenID ${tokenId}`;
  },
  itemNotModified: (state, address, tokenId) => {
    const now = makeTime();
    return `${now} // ${state} Item update on mongoDB not Modified : Reason might be data is already updated : Contrart ${address} // tokenID ${tokenId}`;
  },
  itemNotMatched: (state, address, tokenId) => {
    const now = makeTime();
    return `${now} // ${state} Item update on mongoDB not Matched : Resaon might be not found item : Contrart ${address} // tokenID ${tokenId}`;
  },
  /**
   * Error Message
   */
  mongoDbUpdateError: (error, chain) => {
    const now = makeTime();
    return `${now} // mongoDb update Error : ${chain}` + '\n' + error;
  },

  subscribeError: (error, chain) => {
    const now = makeTime();
    return `${now} // block event error : ${chain}` + '\n' + error;
  },

  connecntionError: (error, chain) => {
    const now = makeTime();
    return `${now} // websocket connection error : ${chain}` + '\n' + error;
  },
};

module.exports = { Chain, NftAddress, LogMessage, MarketContract, SocketEndpoint };
