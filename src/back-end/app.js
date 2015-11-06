var express  = require("express"),
    app      = express(),
    http     = require("http"),
    server   = http.createServer(app),
    mongoose = require('mongoose'),
  allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization');
 
  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
  }
};



app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
    app.use(allowCrossDomain);   // make sure this is is called before the router
});

app.get('/', function(req, res) {
  res.send("Hello world!");
});



require('./routes')(app);

mongoose.connect('mongodb://localhost/courses', function(err, res) {
  if (err) {
    console.log('ERROR: connecting to Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});

server.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
