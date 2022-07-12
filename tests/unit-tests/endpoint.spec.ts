import app from "../../src/app";
import { ICache } from "../../src/model/cache.db.model";

const supertest = require("supertest");
const server = app;
const request = supertest(server);

import * as CacheService from "../../src/service/cache.service";

it("Same value should be returned for multiple requests", async () => {

    const response1 = await request.get("/api/cache/abcd");
    expect(response1.status).toBe(200);
    expect(response1.text).toBeTruthy();

    const value1 = response1.text;

    const response2 = await request.get("/api/cache/abcd");
    expect(response2.status).toBe(200);
    expect(response2.text).toBe(value1);
});

it("save a value for a key", async () => {
    // Sends GET Request to / endpoint
    const response = await request.post("/api/cache/abcd2").send({key: "abcd2", value: "test"});

    expect(response.status).toBe(200);
    expect(response.text).toBeTruthy();
    const json: ICache = JSON.parse(response.text);

    expect(json.key).toBe('abcd2');
    expect(json.value).toBe('test');
});

it("Gets the root endpoint", async () => {
    // Sends GET Request to / endpoint
    const response = await request.get("/api/cache");

    expect(response.status).toBe(200);
    expect(response.text).toBe('["abcd","abcd2"]');
});


// it("remove a key", async () => {
//     // Sends GET Request to / endpoint
//     const response = await request.get("/api/cache");

//     expect(response.status).toBe(200);
//     expect(response.text).toBe('["abcd"]');
// });