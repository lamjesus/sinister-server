import http from 'http';
export class Server {
    constructor(port, hostname) {
        this.port = port;
        this.hostname = hostname;
        this.port = port;
        this.hostname = hostname;
    }
    initServer() {
        const server = http.createServer((req, res) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Hello, World!\n');
        });
        server.listen(this.port, this.hostname, () => {
            console.log('inicia el servidor en el puerto ', this.port);
        });
    }
}
//# sourceMappingURL=Server.js.map