import { ServerService } from './serverServicev1';
import { ServerController } from './serverControllerv1';
import { env } from "./env";
import express from "express";
import { client } from "./db";

export const serverService  = new ServerService(client);
export const serverController = new ServerController(serverService);
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static("public"));
app.use(express.static("protected"));

app.listen(env.PORT, () => {
  console.log(`http://localhost:${env.PORT}/`);
});