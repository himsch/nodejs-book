const http = require('http')
const fs = require('fs').promises

const port = 8082

const users = {} // 데이터 저장용

// async await 은 비동기적인 fs 을 이용하기 위해.
const server = http.createServer(async (req, res) => {
  try {
    if (req.method === 'GET') {
      if (req.url === '/') {
        const data = await fs.readFile('./restFront-self.html')
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        return res.end(data)
      } else if (req.url === '/about') {
        const data = await fs.readFile('./about-self.html')
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        return res.end(data)
      } else if (req.url === '/users') {
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8',
        })
        return res.end(JSON.stringify(users))
      }
      try {
        const data = await fs.readFile(`.${req.url}`)
        return res.end(data)
      } catch (e) {
        // 404 에러 발생
      }
    } else if (req.method === 'POST') {
      if (req.url === '/user') {
        let body = ''
        req.on('data', chunk => {
          body += chunk
        })
        return req.on('end', () => {
          console.log(`post의 body ${body}`)
          const { name } = JSON.parse(body)
          const id = Date.now()
          users[id] = name // users 목록에 추가
          res.writeHead(201, { 'Content-Type': 'text/plain; charset=utf-8' })
          res.end('create success')
        })
      }
    } else if (req.method === 'PUT') {
      if (req.url.startsWith('/user/')) {
        const key = req.url.split('/')[2]
        let body = ''
        req.on('data', chunk => {
          body += chunk
        })
        return req.on('end', () => {
          users[key] = JSON.parse(body).name
          res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
          console.log(req._events.end)
          return res.end('modify ok')
        })
      }
    } else if (req.method === 'DELETE') {
      if (req.url.startsWith('/user/')) {
        const key = req.url.split('/')[2]
        delete users[key]
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
        return res.end('delete ok')
      }
    }
    res.writeHead(404)
    return res.end('Not Found')
  } catch (e) {
    console.error(e)
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end(e.message)
  }
})

server.listen(port, () => {
  console.log(`${port}번 포트에서 서버 대기 중입니다.`)
})
