const art = require('../Model/art');
const { NftAddress } = require('../../constants');
const Web3 = require('web3');
const web3 = new Web3();
const { ParameterError } = require('../Exceptions/ParameterError');

class ArtAction {
  currency;
  price;

  setPriceToEth(_price) {
    this.price = Number(web3.utils.fromWei(_price, 'ether'));
  }
  setCurrency(_contractAddress, _currency) {
    switch (_contractAddress) {
      case NftAddress.Klaytn:
        this.currency = 1;
        break;
      case NftAddress.Polygon:
        if (_currency === NftAddress.Zero) {
          this.currency = 3;
        } else this.currency = 4;
        break;
      case NftAddress.Bsc:
        this.currency = 5;
        break;
      default:
        throw new ParameterError(`Unexpected Contract Address : ${_contractAddress}`);
    }
  }
  async UpdateListed({ contractAddress, tokenId, currency, price }) {
    const filter = { art_nftaddress: contractAddress, art_token_id: tokenId };
    const data = [{ $set: { art_price: { $toDouble: price }, art_list_status: 1, art_currency: currency } }];
    return await art.updateOne(filter, data);
  }

  async UpdateBought({ contractAddress, tokenId }) {
    const filter = { art_nftaddress: contractAddress, art_token_id: tokenId };
    const data = { $set: { art_list_status: 2 } };

    return await art.updateOne(filter, data);
  }

  async UpdateCancel({ contractAddress, tokenId }) {
    const filter = { art_nftaddress: contractAddress, art_token_id: tokenId };
    const data = { $set: { art_list_status: 0, art_price: 0, art_exchange: 0 } };

    return await art.updateOne(filter, data);
  }
}

module.exports = ArtAction;
