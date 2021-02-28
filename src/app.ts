import "reflect-metadata";
import express from "express";
import createConnection from "./database";
import { router } from './routes';


createConnection();
const app = express();

//para receber a informação
app.use(express.json());
app.use(router); //chamar o router

export { app };