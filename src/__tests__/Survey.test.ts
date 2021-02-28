import request from 'supertest';
import { app } from '../app';

import createConnection from "../database"

describe("Surveys", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it("Should be able to create a new survey", async () => {
        const response = await request(app).post("/survey").send({
            title: "title Exemplo",
            description: "Description Exemple"
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    //test com get, valor tem que ser 2
    it("Should be able to create a new survey", async () => {
        await request(app).post("/survey").send({
            title: "title Exemplo 2",
            description: "Description Exemple 2",
        });
        const response = await request(app).get("/survey");

        expect(response.body.length).toBe(2);
    });
});