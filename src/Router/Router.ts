import { IncomingMessage, ServerResponse } from 'http'

interface Handler {
  (req: IncomingMessage, res: ServerResponse, params: Record<string, any>): void
}
interface Route {
  method: string
  cb: Handler
}

export class Router {
  public routes: Record<string, Route> = {} // "route/param",{method: 'GET, cb}
  private middleware: any = []
  constructor() {
    // tengo una coleccion de rutas
    this.routes = {}
    this.middleware = []
  }

  //   use(middleware:any) {
  //     this.middleware.push(middleware)
  //   }

  get(path: string, cb: Handler) {
    this.routes[path] = { cb, method: 'GET' }
  }

  post(path: string, cb: Handler) {
    this.routes[path] = { cb, method: 'POST' }
  }

  put(path: string, cb: Handler) {
    this.routes[path] = { cb, method: 'PUT' }
  }

  delete(path: string, cb: Handler) {
    this.routes[path] = { cb, method: 'DELETE' }
  }

  match(request: any) {
    console.log('req', request.headers.host)
    const { method, url } = request
    const route = this.routes[url]
    console.log('route', this.routes)
    if(!route) console.log('existe la ruta')
    if (route && route.method === method) {
      return { cb: route.cb, params: {} }
    }

    return null
  }

  handle(request: any, response: any) {
    const matchedRoute = this.match(request)

    if (matchedRoute) {
      const { cb, params } = matchedRoute

      // Ejecutar middleware
      // this.middleware.forEach(mw => mw(request, response))

      // Ejecutar cb
      cb(request, response, params)
    } else {
      response.statusCode = 404
      response.end('404 - Not Funca')
    }
  }
}
