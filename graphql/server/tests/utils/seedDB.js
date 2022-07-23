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

export const postOne = {};

export const commentOne = {};
export const commentTwo = {};

const seedDB = async () => {
  //Delete test data
  await prisma.mutation.deleteManyComments();
  await prisma.mutation.deleteManyPosts();
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
  postOne.post = await prisma.mutation.createPost({
    data: {
      title: "The Ark's Boat",
      body: "In the nam of all the is sized...",
      published: true,
      author: { connect: { email: "pookiehounds@email.com" } },
    },
  });
  await prisma.mutation.createPost({
    data: {
      title: "The Boat of Arks",
      body: "seemed impossible at the time...",
      published: false,
      author: { connect: { email: "pookiehounds@email.com" } },
    },
  });
  await prisma.mutation.createPost({
    data: {
      title: "Arks The Boat",
      body: "What a painful reality...",
      published: true,
      author: { connect: { email: "pookiehounds@email.com" } },
    },
  });

  commentOne.comment = await prisma.mutation.createComment({
    data: {
      post: { connect: { id: postOne.post.id } },
      text: "Awesome post, Pooks!",
      author: { connect: { id: userTwo.user.id } },
    },
  });
  commentTwo.comment = await prisma.mutation.createComment({
    data: {
      post: { connect: { id: postOne.post.id } },
      text: "Thanks, Lu!",
      author: { connect: { id: userOne.user.id } },
    },
  });
};

export default seedDB;
