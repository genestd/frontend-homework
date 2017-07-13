var path = require('path');
var InvoiceClient = require('../models/InvoiceClient').InvoiceClientModel
var InvoiceWorkTypes = require('../models/InvoiceWorkTypes')
var Invoice = require('../models/InvoiceClient').InvoiceModel
var mongoose = require('mongoose')
mongoose.connect('mongodb://' + process.env.MONGO_USER + ":" + process.env.MONGO_PASSWORD + '@' + process.env.MONGO_HOST + ':' + process.env.MONGO_PORT + '/' + process.env.MONGO_DB)
module.exports = function(app){

  app.get('/', (req,res)=>{
    res.sendFile( path.resolve('./server/views/index.html'))
  })

  app.get('/clients', (req, res)=>{
    InvoiceClient.find({}, function(err, result){
      if(err){ return console.log(err)}
      res.send(result)
    })
  })

  app.get('/worktypes', (req, res)=>{
    InvoiceWorkTypes.find({}, function(err, result){
      if(err){ return console.log(err)}
      res.send(result)
    })
  })

  app.post('/saveinvoice', (req, res)=>{
    var newInvc = new Invoice(req.body)
    newInvc.save( (err, result)=>{
      if(err){ return console.log(err)}
      res.send(result)
    })
  })

  app.get('/getinvoices', (req, res)=>{
    Invoice.find({}, (err,result)=>{
      if(err){ res.send(err)}
      res.send(result)
    })
  })

  app.post('/getinvoice', (req, res)=>{
    Invoice.findOne({_id: req.body.id}, (err,result)=>{
      if(err){ res.send(err)}
      res.send(result)
    })
  })

}
