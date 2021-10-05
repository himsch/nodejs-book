const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(
  (req, res, next) => {
    console.log('모든 요청에 실행하고싶다.');
    next();
  },
  (req, res, next) => {
    try {
      console.log(asdfadsf);
    } catch (error) {
      next(error);
    }
  }
);

app.get(
  '/',
  (req, res, next) => {
    res.sendFile(path.join(__dirname, './index.html'));
    if (true) {
      next('route');
    } else {
      next();
    }
  },
  (req, res) => {
    console.log('실행 되나요?');
  }
);

app.get('/', (req, res) => {
  console.log('실행 되지롱.');
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

// app.get('*', (req, res) => {
//   res.send('hello everybody');
// });

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('에러났씁니다람지렁이.');
});

app.listen(app.get('port'), () => {
  console.log('익스프레스 서버 실행');
});
