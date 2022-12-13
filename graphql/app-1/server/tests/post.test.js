import "cross-fetch/polyfill";
import seedDB, { userOne, userTwo, postOne } from "./utils/seedDB";
import createClient from "./utils/client";
import getClient from "./utils/getClient";
import prisma from "../src/prisma";
import {
  allPosts,
  updatePost,
  userPosts,
  createPost,
  deletePost,
  subscribeToPosts,
} from "./utils/operations";

const client = createClient();

beforeEach(seedDB);

test("Should retrieve only published posts", async () => {
  const response = await client.query({ query: allPosts });
  expect(response.data.allPosts.length).toBe(2);
  expect(response.data.allPosts[0].published).toBe(true);
  expect(response.data.allPosts[1].published).toBe(true);
});

test("Should fetch user posts", async () => {
  const client = createClient(userOne.jwt);

  const response = await client.query({ query: userPosts });
  expect(response.data.userPosts.length).toBe(3);
  expect(response.data.userPosts[0].published).toBe(true);
  expect(response.data.userPosts[1].published).toBe(false);
});

test("Should update a post", async () => {
  const client = createClient(userOne.jwt);
  const variables = {
    id: postOne.post.id,
    postData: {
      title: "New Title",
      body: "This is an amazing body.",
      published: false,
    },
  };
  const response = await client.mutate({ mutation: updatePost, variables });
  const postUpdatedInDB = await prisma.exists.Post({
    id: postOne.post.id,
    published: false,
  });
  //assert post was updated in DB
  expect(postUpdatedInDB).toBe(true);
  //assert post was updated for user
  expect(response.data.updatePost.published).toBe(false);
  expect(response.data.updatePost.title).toBe("New Title");
  expect(response.data.updatePost.body).toBe("This is an amazing body.");
});

test("should create a post", async () => {
  const client = createClient(userOne.jwt);
  const variables = {
    postData: { title: "Pookie's Date", body: "clothed", published: true },
  };
  //assert app
  const response = await client.mutate({ mutation: createPost, variables });
  expect(response.data.createPost.title).toBe("Pookie's Date");
  //assert DB
  const postUpdatedInDB = await prisma.exists.Post({ id: response.data.id });
  expect(postUpdatedInDB).toBe(true);
});

test("should delete a post", async () => {
  const client = createClient(userOne.jwt);
  const variables = { id: postOne.post.id };
  //assert app
  const response = await client.mutate({ mutation: deletePost, variables });
  expect(response.data.deletePost.title).toBe(postOne.post.title);
  //assert DB
  const postUpdatedInDB = await prisma.exists.Post({ id: postOne.post.id });
  expect(postUpdatedInDB).toBe(false);
});

test("Should get notified when new posts are published", async () => {
  const client = getClient(userOne.jwt);
  const subscription = client.subscribe({ query: subscribeToPosts }).subscribe({
    next(response) {
      expect(response.data.posts.mutation).toBe("CREATED");
      subscription.unsubscribe();
      done();
    },
  });

  await prisma.mutation.createPost({
    data: {
      title: "Pookie's Divorce",
      body: "unclothed",
      published: true,
      author: { connect: { id: userTwo.user.id } },
    },
  });
});
