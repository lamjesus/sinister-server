import { Server } from './Server/Server'
import { Router } from './Router/Router'

const hostname = '127.0.0.1'
const port = 3240
const test = new Router()
const Sinister = new Server(port, hostname)

test.get('/router', (req, res, params) => {
  console.log(req.method)
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello, get\n')
})

Sinister.get('/home', (req, res, params) => {
  console.log(req.method)
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello, get\n')
})

Sinister.post('/post', (req, res, params) => {
  console.log('Creando usuario', req.url)
  res.end('Usuario creado')
})
Sinister.get('/put', (req, res, params) => {
  res.end('Hello, put\n')
})

Sinister.post('/api/users', (req, res, params) => {
  console.log('Creando un nuevo usuario')
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Usuario creado exitosamente')
})
const router = new Router()

router.post('/api', (req, res, params) => {
  console.log('Creando un nuevo usuario', req)
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Usuario creado exitosamente')
})
Sinister.initServer()
