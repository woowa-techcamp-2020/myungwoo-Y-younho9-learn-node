var http = require('http');
var fs = require('fs');
var qs = require('querystring');

var app = http.createServer(function(request,response){
  if(request.url == '/favicon.ico'){
    return response.writeHead(404);
  }
  else if(request.url == '/post') {
    let memo = '';
    request.on('data', function(data){
      memo += data;
    });
    request.on('end', function(){
      let post = qs.parse(body);
      memo += post.description;
    });
  }
  response.writeHead(200);
  response.end(fs.readFileSync(__dirname + request.url));
});
app.listen(3000);