const express = require('express');
const app = express();
const itemRoutes = express.Router();
const mongoose = require('mongoose');

let Item = require('../model/item');

// api to add item
itemRoutes.route('/add').post(function (req, res) {
  console.log("Chegou aqui!")
  let item = new Item(req.body);
  item.save()
  .then(item => {
    res.status(200).json({'status': 'success','mssg': 'item added successfully'});
    console.log('ID do item', item._id)
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get itens
itemRoutes.route('/list').get(function (req, res) {
    /* Item.find(function (err, itens){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','itens': itens});
    } */
    Item.find({})
    .exec()
    .then(itens => {
      res.status(200).json(itens);
    })
    .catch(err => {
      console.error('Erro ao listar itens:', err);
      res.status(500).json({ error: 'Erro ao listar itens' });
    });
  });

// api to get item
itemRoutes.route('/item/:id').get(function (req, res) {
  let id = req.params.id;
  Item.findById(id, function (err, item){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','item': item});
    }
  });
});

// api to update route
itemRoutes.route('/update/:id').put(function (req, res) {
    User.findById(req.params.id, function(err, item) {
    if (!item){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        item.name = req.body.name;
        item.amount = req.body.amount;
        item.brand = req.body.brand;

        item.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
itemRoutes.route('/delete/:id').delete(function (req, res) {
  item.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = itemRoutes;