const http = require('http')
const fs = require('fs').promises
const url = require('url') // url을 쉽게 다룰 수 있게 해주는 모듈
const qs = require('querystring') // query를 쉽게 다룰 수 있게 해주는 모듈

// cookie 를 이쁘게 객체로 만들어줌
const parseCookies = (cookie = '') =>
  cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v)
      return acc
    }, {})

const server = http.createServer(async (req, res) => {
  const cookies = parseCookies(req.headers.cookie)

  if (req.url.startsWith('/login')) {
    const { query } = url.parse(req.url) // url에 query만 가져옴
    const { name } = qs.parse(query) // query의 name 의 값만 가져옴

    const expires = new Date()
    expires.setMinutes(expires.getMinutes() + 5) // 기존 date 값의 5분을 추가해서 set함

    // 쿠키 설정 - HttpOnly 는 Http로만 해당 쿠키 접근 허용
    res.writeHead(302, {
      Location: '/', // / 로 redirection
      'Set-Cookie': `name=${encodeURIComponent(
        name
      )}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
    })
    res.end()
  } else if (cookies.name) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end(`${cookies.name}님 안녕하세요`)
  } else {
    try {
      const data = await fs.readFile('./cookie2-self.html')
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      res.end(data)
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end(e.massage)
    }
  }
})

server.listen(8084, () => {
  console.log(`${8084}번 포트에서 서버 대기중.`)
})
