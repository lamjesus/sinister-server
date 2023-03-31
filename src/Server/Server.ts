import http from 'http'
import { Router } from '../Router/Router';
import { IncomingMessage, ServerResponse } from 'http'

interface Handler {
  (req: IncomingMessage, res: ServerResponse, params: Record<string, any>): void
}
interface Route {
  method: string
  cb: Handler
}

export class Server {
  private router: Router
  constructor(private port: number, private hostname: string) {
    this.router = new Router()
    this.port = port
    this.hostname = hostname
  }

  initServer() {
    const server = http.createServer((req, res) => {
      this.router.handle(req, res)
      server.once('error', (err: any) => {
        if (err.code === 'EADDRINUSE') {
          throw new Error('puerto en uso')
        } else {
          throw new Error(err)
        }
      })
    })

    server.listen(this.port, this.hostname, () => {
      console.log('inicia el servidor en el puerto ', this.port)
    })
  }
  get(path: string, cb: Handler) {
    this.router.get(path, cb)
  }

  post(path: string, cb: Handler) {
    this.router.post(path, cb)
  }

  put(path: string, cb: Handler) {
    this.router.put(path, cb)
  }

  delete(path: string, cb: Handler) {
    this.router.delete(path, cb)
  }
}
