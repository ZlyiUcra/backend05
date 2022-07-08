const http = require('http');
var path = require('path');
var fs = require('fs');
var url = require('url');


let requestsCount = 0;

const  FAVICON = path.join(__dirname, 'assets', 'images', 'smileIcon9.jpg');

const server = http.createServer((request, response) => {

  const pathname = url.parse(request.url).pathname;
  if (request.method === 'GET' && pathname === '/favicon.ico') {
    // MIME type of your favicon.
    //
    // .ico = 'image/x-icon' or 'image/vnd.microsoft.icon'
    // .png = 'image/png'
    // .jpg = 'image/jpeg'
    // .jpeg = 'image/jpeg'
    response.setHeader('Content-Type', 'image/x-icon');

    // Serve your favicon and finish response.
    //
    // You don't need to call `.end()` yourself because
    // `pipe` will do it automatically.
    fs.createReadStream(FAVICON).pipe(response);

    return;
  }

  requestsCount +=1;

  switch (request.url) {
    case '/students':
      response.write('STUDENTS');
      break;
    case '/':
    case '/courses':
      response.write('FRONT + BACK');
      break;
    default:
      response.write('404 not found');
  }
  response.write(' IT-KAMASUTRA: ' + requestsCount)
  response.end();
});

server.listen(3003);