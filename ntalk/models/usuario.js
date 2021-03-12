const db = require('../libs/db.js');
const Schema = require('mongoose').Schema;

module.exports = function () {
  var contato = Schema({
    nome: String
    , email: String
  });
  var usuario = Schema({
    nome: { type: String, required: true }
    , email: {
      type: String, required: true
      , index: { unique: true }
    }
    , contatos: [contato]
  });
  return db.model('usuarios', usuario, 'usuarios');
};