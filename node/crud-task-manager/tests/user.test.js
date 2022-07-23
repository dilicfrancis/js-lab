const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { userOneId, userOne, initiateDb } = require("./fixtures/db");

beforeEach(initiateDb);

//afterEach(() => console.log("afterEach"));
//There is also beforeAll() and afterAll - which runs before or after the entire suite of tests instead of before each individually

test("Should sign up a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Mocka Lito",
      email: "tevasi1317@asmm5.com",
      password: "gdhu487fjk",
    })
    .expect(201);

  //Assert Db was correctly changed i.e. new user with same id as id in response.body
  const user = await User.find({ email: response.body.user.email }); //returns an array
  //const user = await User.findById(response.body.user._id); //returns an object
  expect(user).not.toBeNull();

  //Assert response.body contains an item
  expect(response.body).toMatchObject({
    user: { name: "Mocka Lito", email: "tevasi1317@asmm5.com" },
    token: user[0].tokens[0].token,
  });

  expect(user.password).not.toBe("gdhu487fjk");
});

test("Should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({ email: userOne.email, password: userOne.password })
    .expect(200);

  const user = await User.find({ email: response.body.user.email }); //returns an array
  expect(user).not.toBeNull();

  expect(response.body.token).toBe(user[0].tokens[1].token);
});

test("Should not login nonexistent user", async () => {
  await request(app)
    .post("/users/login")
    .send({ email: "non@existent.com", password: "f49n983" })
    .expect(400);
});

test("Should retrieve user profile", async () => {
  await request(app)
    .get("/users/profile")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not retrieve a user profile for unauthenticated user", async () => {
  await request(app).get("/users/profile").send().expect(401);
});

test("Should delete the user's account", async () => {
  const response = await request(app)
    .delete("/users/profile")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.find({ email: response.body.email }); //returns an array
  expect(user).toEqual([]);
});

test("Should not delete an account for unauthenticated user", async () => {
  await request(app).delete("/users/profile").send().expect(401);
});

test("Should upload profile image", async () => {
  await request(app)
    .post("/users/profile/pic")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("pic", "tests/fixtures/profile-pic.jpg")
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.profile_pic).toEqual(expect.any(Buffer));
});

test("Should update valid fields for the user", async () => {
  const response = await request(app)
    .patch("/users/profile")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ name: "Hooky Fruit" })
    .expect(200);

  const user = await User.find({ email: response.body.email });
  expect(user[0].name).toBe("Hooky Fruit");
});
test("Should not update fields that do not exist", async () => {
  await request(app)
    .patch("/users/profile")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ location: "Diego" })
    .expect(400);
});
