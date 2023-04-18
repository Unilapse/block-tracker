const ArtAction = require('../database/Actions/ArtActions');
const { NftAddress } = require('../constants');
const { writeSuccessLog, writeErrorLogUpdateDB, writeErrorLogSubscribe } = require('./logAction');

const chainEndpointMap = {
  klaytn: NftAddress.Klaytn,
  polygon: NftAddress.Polygon,
  bsc: '',
};

function listingTrack(chain, marketContract) {
  const nftContractAddress = chainEndpointMap[chain];
  marketContract.events
    .ListItem()
    .on('connected', (id) => {
      console.log(`ListItem subscription connected (${id})`);
    })
    .on('data', async (event) => {
      try {
        const art = new ArtAction();
        art.setPriceToEth(event.returnValues.price);
        art.setCurrency(nftContractAddress, event.returnValues.currency);
        const tokenID = event.returnValues.tokenId;
        const data = {
          contractAddress: nftContractAddress,
          tokenId: tokenID,
          currency: art.currency,
          price: art.price,
        };
        const result = await art.UpdateListed(data);
        writeSuccessLog(nftContractAddress, tokenID, 'List', result);
      } catch (error) {
        writeErrorLogUpdateDB(error, chain);
      }
    })
    .on('error', (error) => {
      writeErrorLogSubscribe(error, chain);
    });
}

function buyTrack(chain, marketContract) {
  const nftContractAddress = chainEndpointMap[chain];
  marketContract.events
    .BuyItem()
    .on('connected', (id) => {
      console.log(`BuyItem subscription connected (${id})`);
    })
    .on('data', async (event) => {
      try {
        const art = new ArtAction();
        const tokenID = event.returnValues.tokenId;
        const data = { contractAddress: nftContractAddress, tokenId: tokenID };
        const result = await art.UpdateBought(data);
        writeSuccessLog(nftContractAddress, tokenID, 'Buy', result);
      } catch (error) {
        writeErrorLogUpdateDB(error, chain);
      }
    })
    .on('error', (error) => {
      writeErrorLogSubscribe(error, chain);
    });
}

function cancelTrack(chain, marketContract) {
  const nftContractAddress = chainEndpointMap[chain];
  marketContract.events
    .CancelListedItem()
    .on('connected', (id) => {
      console.log(`CancelListedItem subscription connected (${id})`);
    })
    .on('data', async (event) => {
      try {
        const art = new ArtAction();
        const tokenID = event.returnValues.tokenId;
        const data = { contractAddress: nftContractAddress, tokenId: tokenID };
        const result = await art.UpdateCancel(data);
        writeSuccessLog(nftContractAddress, tokenID, 'Cancel', result);
      } catch (error) {
        writeErrorLogUpdateDB(error, chain);
      }
    })
    .on('error', (error) => {
      writeErrorLogSubscribe(error, chain);
    });
}
function blockTrack(web3) {
  web3.eth
    .subscribe('newBlockHeaders')
    .on('data', (data) => {
      console.log(`Received block header for block number ${data.number}.`);
    })
    .on('error', (error) => {
      console.error(error);
      console.error('An error occured on the new blocks subscription.');
    })
    .on('connected', (id) => {
      console.log(`NewBlockHeaders subscription connected (${id})`);
    });
}

module.exports = {
  listingTrack,
  buyTrack,
  cancelTrack,
  blockTrack,
};
