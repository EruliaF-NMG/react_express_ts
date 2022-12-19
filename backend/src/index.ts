import 'reflect-metadata';
import http from 'http';

import { port } from "./config/app.config";
import Bootstrap from "./bootstrap/bootstrap";

const server = http.createServer(Bootstrap.instance);

server.listen(port, () => {
  console.log(`Server is listening on :${port}`);
});