import http from 'http'
import { Router } from '../Router/Router';

export class Server extends Router {
  constructor(private port: number, private hostname: string) {
    super()
    this.port = port
    this.hostname = hostname
  }

  initServer() {
    const server = http.createServer((req, res) => {
      const server = http.createServer()
      //res.statusCode = 200
      // res.setHeader('Content-Type', 'text/plain')
      // res.end('Hello, Fucking World!\n')
      this.handle(req,res)
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
}

// check port
// private async isPortFree() {
//     try {
//         await new Promise((resolve, reject) => {
//             const server = http.createServer();
//             server.once('error', (err: any) => {
//                 if (err.code === 'EADDRINUSE') {
//                    throw new Error('puerto en uso')
//                 } else {
//                     reject(err);
//                 }
//             });
//             server.once('listening', () => {
//                 server.close();
//                 resolve(true);
//             });
//             server.listen(this.port);
//         });
//         return true;
//     } catch (error) {

//     }
// }
