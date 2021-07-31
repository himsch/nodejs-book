const http = require('http')
const fs = require('fs').promises
const url = require('url')
const qs = require('querystring')

const parseCookies = (cookie = '') =>
  cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v)
      return acc
    }, {})

const session = {}

const server = http.createServer(async (req, res) => {
  const cookies = parseCookies(req.headers.cookie)

  if (req.url.startsWith('/login')) {
    const { query } = url.parse(req.url)
    const { name } = qs.parse(query)

    const expires = new Date()
    expires.setMinutes(expires.getMinutes() + 5)

    // 유니크한 값을 만들어 key값으로 사용.
    const uniqInt = Date.now()
    session[uniqInt] = {
      name,
      expires,
    }

    res.writeHead(302, {
      Location: '/',
      'Set-Cookie': `session=${uniqInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
    })
    res.end()
  } else if (
    cookies.session &&
    session[cookies.session]?.expires > new Date()
  ) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end(`${session[cookies.session].name}님 안녕하세요.`)
  } else {
    try {
      const data = await fs.readFile('./cookie2-self.html')
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      res.end(data)
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end(e.message)
    }
  }
})

server.listen(8085, () => {
  console.log('8085번 포트에서 서버 대기중 입니다.')
})
