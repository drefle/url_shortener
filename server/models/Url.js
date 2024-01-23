const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
  urlShort : {type : String,required: true},
  urlLong : {type : String, required: true}
})

module.exports = mongoose.model('Url',urlSchema);