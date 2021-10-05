const express = require('express');
// const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    morgan('combined')(req, res, next);
  } else {
    morgan('dev')(req, res, next);
  }
});

app.use(cookieParser('songhonggyu'));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: 'songhonggyu',
    cookie: {
      httpOnly: true,
    },
    name: 'connect.sid',
  })
);
// app.use('요청 경로', express.static('실제 경로'));
// app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log('모든 요청에 실행하고싶다.');
  next();
});

app.get('/', (req, res, next) => {
  req.session.id = 'hello';
  res.sendFile(path.join(__dirname, './index.html'));
});

app.post('/', (req, res) => {
  res.send('hello express');
});

app.get('/category/javascript', (req, res) => {
  res.send('hello javascript');
  console.log('hello');
});

app.get('/about', (req, res) => {
  res.send('hello express');
});

app.get('/category/:name', (req, res) => {
  res.send('hello wildcard');
});

app.use((req, res) => {
  res.status(404).send('404');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('에러났씁니다람지렁이.');
});

app.listen(app.get('port'), () => {
  console.log('익스프레스 서버 실행');
});
