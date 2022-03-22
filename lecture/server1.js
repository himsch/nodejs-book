// const http = require('http');

// const server = http
//   .createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
//     res.write('<h1>Hello Node!</h1>');
//     res.write('<p>Hello Server</p>');
//     res.end('<p>Heelo Song</p>');
//   })
//   .listen(8080);

// server.on('listening', () => console.log('8080포트에서 대기중.'));
// server.on('error', e => console.error(e));

const http = require('http');

http
  .createServer((req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
    });
    res.write('<h1>Hello Node!</h1>');
    res.write('<p>Hello server</p>');
    res.end('<p>Hello Song</p>');
  })
  .listen(8081, () => {
    console.log('8081번 포트에서 서버 대기 중입니다.');
  })
  .on('listening', () => {
    console.log('이건 listening');
  })
  .on('err', e => console.log(e));
