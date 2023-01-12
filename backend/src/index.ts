import 'reflect-metadata';
import http from 'http';

import { mongoUri, port } from "./config/app.config";
import Bootstrap from "./bootstrap/bootstrap";
import mongoose from 'mongoose';

const server = http.createServer(Bootstrap.instance);

// Database Connection URL
//mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose.connect(mongoUri);

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

server.listen(port, () => {
  console.log(`Server is listening on :${port}`);
});