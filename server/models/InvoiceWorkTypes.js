var mongoose = require('mongoose')
var Schema = mongoose.Schema

var InvoiceWorkTypes = new Schema({
  description: String,
  rate: Number
})

module.exports = mongoose.model("InvoiceWorkTypes", InvoiceWorkTypes)
