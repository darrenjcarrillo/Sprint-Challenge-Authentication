const request = require("supertest");

const server = require("./server.js");
const db = require("../database/dbConfig.js");

it("should set db environment to testing", function() {
  expect(process.env.DB_ENV).toBe("testing");
});

describe("Should get all jokes", function() {
  describe("GET /", function() {
    beforeEach(async () => {
      await db("users").truncate();
    });

    it("should return 201 OK", function() {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "TEST", password: "TEST" })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });

    it("should return have username", function() {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "TEST", password: "TEST" })
        .then(res => {
          expect(res.body.username).toEqual("TEST");
        });
    });

    it("should return status 201 on login", async () => {
      //user registers
      const response = await request(server)
        .post("/api/auth/register")
        .send({ username: "JOSHUA", password: "JOSHUA" });

      //user logs in
      const loginResponse = await request(server)
        .post("/api/auth/login")
        .send({ username: "JOSHUA", password: "JOSHUA" });
      expect(loginResponse.status).toBe(200);
    });

    it("Can't login with Invalid credentials", async function() {
      const response = await request(server)
        .post(`/api/auth/login`)
        .send({
          username: "WHATS UP",
          password: "ASDASD"
        })
        .then(res => {
          expect(res.status).toBe(401);
        });
    });
  });
});
