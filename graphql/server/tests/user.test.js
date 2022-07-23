import "cross-fetch/polyfill";
import prisma from "../src/prisma";
import seedDB, { userOne } from "./utils/seedDB";
import createClient from "./utils/client";
import { createUser, allUsers, loginUser, user } from "./utils/operations";

const client = createClient();

beforeEach(seedDB);

test("Should create a new user", async () => {
  const variables = {
    userData: {
      name: "Tony Parks",
      email: "tony@parks.com",
      password: "Tony876boss",
    },
  };

  const response = await client.mutate({ mutation: createUser, variables });
  const userExists = await prisma.exists.User({
    id: response.data.createUser.user.id,
  });
  expect(userExists).toBe(true);
});

test("Should show public author profiles", async () => {
  const response = await client.query({ query: allUsers });
  expect(response.data.allUsers.length).toBe(2);
  expect(response.data.allUsers[0].email).toBe(null);
  expect(response.data.allUsers[0].name).toBe("Pookie Hounds");
});

test("Should deny bad credentials", async () => {
  const variables = {
    loginData: { email: "non@existing.com", password: "pass11111" },
  };
  await expect(
    client.mutate({ mutation: loginUser, variables })
  ).rejects.toThrow();

  //   expect(() => {
  //     throw new Error("error");
  //   }).toThrow();
});

test("Should deny password less than 8 characters", async () => {
  const variables = {
    userData: { name: "New User", email: "new@user.com", password: "sh876" },
  };

  await expect(
    client.mutate({ mutation: createUser, variables })
  ).rejects.toThrow();
});

test("Should fetch user profile", async () => {
  const client = createClient(userOne.jwt);
  const response = await client.query({ query: user });
  expect(response.data.user.id).toBe(userOne.user.id);
  expect(response.data.user.email).toBe(userOne.user.email);
  expect(response.data.user.name).toBe(userOne.user.name);
});
