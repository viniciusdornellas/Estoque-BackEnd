const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Item = new Schema({
  name: {
    type: String
  },
  amount: {
    type: Number
  },
  brand: {
    type: String
  }
},{
    collection: 'item'
});

module.exports = mongoose.model('Item', Item);