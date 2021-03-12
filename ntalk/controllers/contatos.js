module.exports = (app) => {
  const ContatosController = {
    index(req, res) {
      var _id = req.session.usuario._id;
      Usuario.findById(_id, function (erro, usuario) {
        var contatos = usuario.contatos;
        var resultado = { contatos: contatos };
        res.render('contatos/index', resultado);
      });
    },

    create(req, res) {
      var _id = req.session.usuario._id;
      Usuario.findById(_id, function (erro, usuario) {
        var contato = req.body.contato;
        var contatos = usuario.contatos;
        contatos.push(contato);
        usuario.save(function () {
          res.redirect('/contatos');
        });
      });

    },
    show(req, res) {
      var _id = req.session.usuario._id;
      Usuario.findById(_id, function (erro, usuario) {
        var contatoID = req.params.id;
        var contato = usuario.contatos.id(contatoID);
        var resultado = { contato: contato };
        res.render('contatos/show', resultado);
      });
    },

    edit(req, res) {
      var _id = req.session.usuario._id;
      Usuario.findById(_id, function (erro, usuario) {
        var contatoID = req.params.id;
        var contato = usuario.contatos.id(contatoID);
        var resultado = { contato: contato };
        res.render('contatos/edit', resultado);
      })
    },

    update(req, res) {
      var _id = req.session.usuario._id;
      Usuario.findById(_id, function (erro, usuario) {
        var contatoID = req.params.id;
        var contato = usuario.contatos.id(contatoID);
        contato.nome = req.body.contato.nome;
        contato.email = req.body.contato.email;
        usuario.save(function () {
          res.redirect('/contatos');
        });
      });
    },
    destroy(req, res) {
      var _id = req.session.usuario._id;
      Usuario.findById(_id, function (erro, usuario) {
        var contatoID = req.params.id;
        usuario.contatos.id(contatoID).remove();
        usuario.save(function () {
          res.redirect('/contatos');
        });
      });
    }
  };
  return ContatosController;
};
