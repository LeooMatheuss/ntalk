
module.exports = (app) => {
  const Usuario = app.models.usuario;

  const HomeController = {
    index(req, res) {
      res.render('home/index');
    },
    /*
    login(req, res) {
      const { usuario } = req.body;
      const { email, nome } = usuario;
      if (email && nome) {
        usuario.contatos = [];
        req.session.usuario = usuario;
        res.redirect('/contatos');
      } else {
        res.redirect('/');
      }
    },*/
    login(req, res) {
      var query = { email: req.body.usuario.email, nome: req.body.usuario.nome };
      Usuario.findOne(query)
        .select('nome email')
        .exec(function (erro, usuario) {
          console.log(erro);
          if (usuario) {
            req.session.usuario = usuario;
            res.redirect('/contatos');
          } else {
            Usuario.create(req.body.usuario, function (erro, usuario) {
              if (erro) {
                res.redirect('/');
              } else {
                req.session.usuario = usuario;
                res.redirect('/contatos');
              }
            });
          }
        });
    },



    logout(req, res) {
      req.session.destroy();
      res.redirect('/');
    }
  };
  return HomeController;
};