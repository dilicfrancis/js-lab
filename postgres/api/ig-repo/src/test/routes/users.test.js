const request = require("supertest");
const buildApp = require("../../app");
const userRepo = require("../../repos/user-repo");
const Context = require("../context");

let context;
beforeAll(async () => {
  context = await Context.build();
});

beforeEach(async () => await context.reset());

afterAll(() => context.close());

it("create a user", async () => {
  const preCount = await userRepo.count();

  await request(buildApp())
    .post("/users")
    .send({ username: "loki", bio: "loki is the name" })
    .expect(201);

  const postCount = await userRepo.count();
  expect(postCount - preCount).toEqual(1);
});
