const request = require("supertest");
const jokesRouter = require("../api/server");
const db = require("../database/dbConfig.js");

describe("Jokes Router", () => {
  describe("GET/", () => {
    beforeEach(async () => {
      await db("users").truncate();
    });

    it("IT SHOULD GET ALL JOKES", async () => {
      //user registers
      const response = await request(jokesRouter)
        .post("/api/auth/register")
        .send({ username: "TEST1", password: "TEST1" });

      //user logs in
      const login = await request(jokesRouter)
        .post("/api/auth/login")
        .send({ username: "TEST1", password: "TEST1" })
        .expect("Content-Type", /json/);
      console.log(login.body);

      //jokesRouter responds with jokes in json format
      const jokes = await request(jokesRouter)
        .get("/api/jokes")
        .auth("TEST1", "TEST1")
        .set("Authorization", login.body.token)
        .expect("Content-Type", /json/);
    });
  });
});
