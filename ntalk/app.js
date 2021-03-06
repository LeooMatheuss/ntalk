const express = require('express');
const path = require('path');

const consign = require('consign');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const methodOverride = require('method-override');
const error = require('./middlewares/error');
const app = express();



const load = require('express-load')
const server = require('http').createServer(app)
const io = require('socket.io').listen(server);
const mongoose = require('mongoose');

global.db = mongoose.connect('mongodb://localhost/ntalk');




app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser('ntalk'));
app.use(expressSession({ resave: true, saveUninitialized: true, secret: 'ntalk' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

consign({})
  .include('models')
  .then('controllers')
  .then('routes')
  .into(app)
  ;

app.use(error.notFound);
app.use(error.serverError);



io.sockets.on('connection', function (client) {
  client.on('send-server', function (data) {
    console.log(data);
    var msg = "<b>" + data.nome + ":</b> " + data.msg + "<br>";
    client.emit('send-client', msg);
    client.broadcast.emit('send-client', msg);
  });
});

server.listen(3000, function () {
  console.log("Talk no ar.");
});