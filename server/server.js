const config = require('../webpack.config');
const webpack = require('webpack');
const webPackDevMiddleware = require('webpack-dev-middleware');
const webPackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const path = require('path');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const compiler = webpack(config);

app.use(webPackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webPackHotMiddleware(compiler));
app.use(express.static('./dist'));

app.use('/', (req, res) => {
    res.sendFile(path.resolve('client/index.html'));
});


const port = 3000;
let allMessages = [];

io.on('connection', (socket) => {
  socket.emit('mount', { allMessages });
  socket.on('my other event', (data) => {
    console.log(data);
  });
  socket.on('newMessage', (data) => {
    allMessages = data.allMessages.slice();
    allMessages.push(data.message);
    const newMessage = {
      message: data.message,
      allMessages
    };
    console.log('new message', newMessage);
    io.emit('newMessage', newMessage);
  });
  socket.on('test', () => {
    console.log('TEST FROM APP EMIT');
  });
});

server.listen(port, (error) => {
  if (error) throw error;
  console.log('Express server listening on port', port);
});
