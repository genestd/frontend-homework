var mongoose = require('mongoose')
var Schema = mongoose.Schema

var InvoiceClient = new Schema({
  name: String,
  acctNumber: String
})

var Invoice = new Schema({
  client: {type: InvoiceClient},
  serviceDate: Date,
  invoiceDate: Date,
  dueDate: Date,
  workItems: [],
  details: String,
  status: String
})

var InvoiceModel = mongoose.model("Invoice", Invoice)
var InvoiceClientModel = mongoose.model("InvoiceClient", InvoiceClient)

module.exports = {InvoiceModel, InvoiceClientModel}
