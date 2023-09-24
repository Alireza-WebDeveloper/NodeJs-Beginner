const fs = require('fs');
const url = require('url');
const http = require('http');
const config = require('./modules/config');
// Course
const courseOfData = fs.readFileSync(`${__dirname}/data/course.json`, 'utf-8');
const courseOfdataObj = JSON.parse(courseOfData);

// Server
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Config Access
  config(res);
  // OverView
  if (pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Server is running');
  } else if (pathname === '/api/course' && query.id) {
    const resData = courseOfdataObj.find(
      ({ course_id }) => course_id === Number(query.id)
    );
    if (!resData) {
      res.writeHead(400, { 'Content-type': 'text/plain' });
      res.end('not found page');
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(resData));
    }
  }
  // Course
  else if (pathname === '/api/course') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(courseOfData);
  }
  // Not Found
  else {
    res.writeHead(400, { 'Content-type': 'text/plain' });
    res.end('not found page');
  }
});

// Server Run Port
server.listen(8000, () => {
  console.log('Server Running Port 8000');
});
