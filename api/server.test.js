const request = require("supertest");

const server = require("./server.js");
const db = require("../database/dbConfig.js");

const authenticate = require("../auth/authenticate-middleware.js");
const authRouter = require("../auth/auth-router.js");

it("should set db environment to testing", function() {
  expect(process.env.DB_ENV).toBe("testing");
});

describe("Should get all jokes", function() {
  describe("GET /", function() {
    // it("get all jokes should return 200 OK", function() {
    //   return request(server)
    //     .get("/api/jokes", authenticate, jokesRouter)
    //     .then(res => {
    //       expect(res.status).toBe(200);
    //     });
    // });
    beforeEach(async () => {
      await db("users").truncate();
    });

    it("should return 201 OK", function() {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "HELLO", password: "HELLO" })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });

    it("should return have username", function() {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "HELLO", password: "HELLO" })
        .then(res => {
          expect(res.body.username).toEqual("HELLO");
        });
    });

    // it("succeeds with correct credentials", function() {
    //   return request(server)
    //     .post("/api/auth/login")
    //     .send({ username: "HELLO", password: "HELLO" })
    //     .then(res => {
    //       expect(res.status).toBe(201);
    //     });
    // });

    it("good login", async () => {
      try {
        const response = await request(server.login)('"HELLO"', '"HELLO"');
        expect(response.status).toBe(200);
      } 

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
