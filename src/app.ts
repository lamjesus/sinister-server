import { Server } from "./Server/Server";


const hostname = '127.0.0.1';
const port = 3240;

const Sinister = new Server(port,hostname)
Sinister.initServer()

