const express = require('express')
const path = require('path')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()

// .set() 메소드로 전역 변수? 느낌으로 사용 가능.
app.set('port', process.env.PORT || 3000)

app.use(morgan('dev'))
app.use('/', express.static(path.join(__dirname, 'public-3030')))
app.use(cookieParser())
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: 'songpassword',
    cookie: {
      httpOnly: true,
    },
    name: 'connect.sid',
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  console.log('모든 요청에 실행')
  next()
})

app.get('/', (req, res) => {
  req.cookies
  req.signedCookies
  // 'Set-Cookie': `name=${}; Expires=${}; HttpOnly; Path=/`
  res.cookie('name', encodeURIComponent(name), {
    expires: new Date(),
    httpOnly: true,
    path: '/',
  })
  res.clearCookie('name', encodeURIComponent(name), {
    httpOnly: true,
    path: '/',
  })
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/', (req, res) => {
  res.send('hello express')
})

app.get('/about', (req, res) => {
  res.send('hello express')
})

app.use((req, res, next) => {
  res.send('404지롱')
})

app.use((err, req, res, next) => {
  console.log(err)
})

// .get() 으로 set으로 지정해놓은것을 가져다 사용
app.listen(app.get('port'), () => {
  console.log('express 실행')
})
