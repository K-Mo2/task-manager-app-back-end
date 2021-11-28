const app = require("../app");
const request = require("supertest");

test("should sign up a new user", async () => {
  await request(app)
    .post("/users/signup")
    .send({
      name: "karim",
      email: "karim@example.com",
      password: "mypassword",
    })
    .expect(201);
});
