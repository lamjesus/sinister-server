const http = require('http');

class CheckPort {
    constructor(private port){
        this.port = port
    }

    async isPortFree(){
        try {
            await new Promise((resolve, reject) => {
                const server = http.createServer();
                server.once('error', err => {
                  if (err.code === 'EADDRINUSE') {
                    resolve(false);
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