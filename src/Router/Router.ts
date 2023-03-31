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
  public middleware: any = []
  constructor() {
    // tengo una coleccion de rutas
    this.routes = {}
    // tengo una coleccion de middlewares, que son funciones que se ejecutan antes de la ruta que se esta solicitando y que reciben el request y el response
    this.middleware = []
  }

  use(middleware: any) {
    this.middleware.push(middleware)
  }

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

  match(request: any): { cb: Handler; params: Record<string, any> } | null {
    const { method, url } = request
    const route = this.routes[url]
    if (!route) console.log('No existe la ruta')
    if (route && route.method === method) {
      console.log(' existe la ruta')
      return { cb: route.cb, params: {} }
    }

    return null
  }

  handle(request: any, response: any) {
    const matchedRoute = this.match(request)
    if (matchedRoute) {
      const { cb, params } = matchedRoute

      // Ejecutar middleware
      this.middleware.forEach((mw: any) => mw(request, response))

      // Ejecutar cb
      cb(request, response, params)
    } else {
      response.statusCode = 404
      response.end('404 - Not Funca')
    }
  }
}
