import http from 'http'
import { CheckPort } from './CheckPort';

export class Server {
    constructor(private port: number, private hostname: string) {

        this.port = port
        this.hostname = hostname
    }

    async initServer() {
        const portFree = await this.isPortFree()
        if(portFree){

            const server = http.createServer((req, res) => {
              
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Hello, World!\n');
            });
    
            server.listen(this.port, this.hostname, () => {
                console.log('inicia el servidor en el puerto ', this.port)
            });
        }

    }


    // check port 
    private async isPortFree() {
        try {
            await new Promise((resolve, reject) => {
                const server = http.createServer();
                server.once('error', (err: any) => {
                    if (err.code === 'EADDRINUSE') {
                       throw new Error('puerto en uso')
                    } else {
                        reject(err);
                    }
                });
                server.once('listening', () => {
                    server.close();
                    resolve(true);
                });
                server.listen(this.port);
            });
            return true;
        } catch (error) {

        }
    }


}