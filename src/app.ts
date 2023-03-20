import { Server } from './Server/Server'
import { Router } from './Router/Router'

const hostname = '127.0.0.1'
const port = 3240

const Sinister = new Server(port, hostname)

const sinister = new Router()

sinister.get('/test', (req, res) => {
  return 'GET Realizado'
})
console.log(sinister.routes)
Sinister.initServer()
