const mongoose = require('mongoose');

const artSchema = new mongoose.Schema({
  art_artist: {
    type: String,
    required: true,
  },
  art_title: {
    type: String,
    required: true,
  },
  art_description: {
    type: String,
    required: true,
  },
  art_opensea: { type: String, default: null },
  art_token_id: { type: String, default: null },
  art_nftaddress: {
    type: String,
    default: null,
  },
  art_mediaurl: {
    type: String,
    required: true,
  },
  art_thumbnail: { type: String, default: null },
  art_media_type: { type: Number, default: 1 },
  art_price: {
    type: Number,
    default: 0,
  },
  art_owner: { type: String, required: true },
  art_collection: { type: String, default: null },
  art_category: { type: String, default: null },
  art_featured: { type: Boolean, default: false },
  art_currency: { type: Number, default: 0 },
  art_exchange: { type: Number, default: 0 },
  art_created: {
    type: Date,
    default: Date.now,
  },
  art_updated: {
    type: Date,
    default: Date.now,
  },
  art_status: {
    type: Number,
    default: 0,
  },
  art_list_status: {
    type: Number,
    default: 0,
  },
  art_minted: {
    type: Number,
    default: 0,
  },
  art_metadata: {
    type: String,
    default: null,
  },
});

const art = new mongoose.model('art', artSchema);
module.exports = art;
