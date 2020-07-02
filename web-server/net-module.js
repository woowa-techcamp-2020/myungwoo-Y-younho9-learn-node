var net = require('net');
var server = net.createServer(function(c) { //'connection' listener
  console.log('client connected');
  c.on('end', function() {
    console.log('client disconnected');
    // return 'index.html'
  });
  c.write('hello\r\n');
  c.pipe(c);
});
server.listen(3000, function() { //'listening' listener
  console.log('server bound');
});