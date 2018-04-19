const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const fs = require('fs');
const historyApiFallback = require('connect-history-api-fallback');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http').Server(app);
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../config/config');
const webpackConfig = require('../webpack.config');
const io = require('socket.io').listen(http);
const isDev = process.env.NODE_ENV !== 'production';
const port  = process.env.PORT || 3000;



mongoose.connect(isDev ? config.db_dev : config.db, {
     useMongoClient: true,
});
mongoose.Promise = global.Promise;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./routes')(app);

if (isDev) {
     const compiler = webpack(webpackConfig);

     app.use(historyApiFallback({
          verbose: false
     }));

     app.use(webpackDevMiddleware(compiler, {
          publicPath: webpackConfig.output.publicPath,
          contentBase: path.resolve(__dirname, '../client/public'),
          stats: {
               colors: true,
               hash: false,
               timings: true,
               chunks: false,
               chunkModules: false,
               modules: false
          }
     }));

     app.use(webpackHotMiddleware(compiler));
     app.use(express.static(path.resolve(__dirname, '../dist')));
} else {
     app.use(express.static(path.resolve(__dirname, '../dist')));
     app.get('*', function (req, res) {
          res.sendFile(path.resolve(__dirname, '../dist/index.html'));
          res.end();
     });
}

io.on('connection', (socket) =>{
     console.log('user is connected!');

     socket.on('message', function(msg){
          console.log('message: ' + msg);
     });

     socket.on('disconnect', function(){
          console.log('user disconnected');
     });
});


http.listen(port, '0.0.0.0', (err) => {
     if (err) {
          console.log(err);
     }

     console.info('Server started, open http://localhost:%s/ in your browser.', port);
});

module.exports = app;
