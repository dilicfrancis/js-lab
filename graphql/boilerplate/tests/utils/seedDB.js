jest.setTimeout(15000);

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../src/prisma";

export const userOne = {
  input: {
    name: "Pookie Hounds",
    email: "pookiehounds@email.com",
    password: bcrypt.hashSync("rowrowboat"),
  },
  user: undefined,
  jwt: undefined,
};

export const userTwo = {
  input: {
    name: "Lucy Luck",
    email: "lulu@luck.com",
    password: bcrypt.hashSync("luluneverstuck$"),
  },
  user: undefined,
  jwt: undefined,
};

const seedDB = async () => {
  //Delete test data
  await prisma.mutation.deleteManyUsers();

  //create a users
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input,
  });
  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input,
  });
  //generate a token for created users
  userOne.jwt = jwt.sign({ userID: userOne.user.id }, process.env.JWT_SECRET);
  userTwo.jwt = jwt.sign({ userID: userTwo.user.id }, process.env.JWT_SECRET);
};

export default seedDB;
