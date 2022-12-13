import "cross-fetch/polyfill";
import prisma from "../src/prisma";
import createClient from "./utils/client";
import getClient from "./utils/getClient";
import {
  createComment,
  deleteComment,
  subscribeToComments,
} from "./utils/operations";
import seedDB, {
  userOne,
  userTwo,
  commentOne,
  commentTwo,
  postOne,
} from "./utils/seedDB";

beforeEach(seedDB);

test("Should return comments", async () => {
  const commentOneExists = await prisma.exists.Comment({
    id: commentOne.comment.id,
  });
  const commentTwoExists = await prisma.exists.Comment({
    id: commentTwo.comment.id,
  });
  expect(commentOneExists).toBe(true);
  expect(commentTwoExists).toBe(true);
});

test("Should delete own comment", async () => {
  const client = createClient(userTwo.jwt);
  const variables = { id: commentOne.comment.id };
  await client.mutate({ mutation: deleteComment, variables });
  //verify delete in db
  const commentOneExists = await prisma.exists.Comment({
    id: commentOne.comment.id,
  });
  expect(commentOneExists).toBe(false);
});

test("Should not delete other users' comment", async () => {
  const client = createClient(userOne.jwt);
  const variables = { id: commentOne.comment.id };
  await expect(
    client.mutate({ mutation: deleteComment, variables })
  ).rejects.toThrow();
});

test("Should subscribe to comments for a post", async () => {
  //<<<<<< test fails once done is added to args <<<<<<<<<
  // jest.setTimeout();

  const variables = { id: postOne.post.id };
  const client = getClient();
  const subscription = client
    .subscribe({ query: subscribeToComments, variables })
    .subscribe({
      next(response) {
        //expect(response.data.comment.mutation).toBe("DELETED");
        expect(1).toBe(2);
        subscription.unsubscribe();
        done();
        //expect(response.data.comments.node.text).toBe("Kinda amazing!");
      },
    });
  // setTimeout(
  //   async () =>
  await prisma.mutation.deleteComment({
    where: { id: commentOne.comment.id },
  });
  //   500
  // );
});

//Error
//once done is added to the async function for test in order to trigger next(), jest complains of timeout.

//Remedies Attempted
// added setTimeout to prima delete operation (failed).
// added jest SetTimeout to test case (failed)
// set time out delays to unrealistic amount just to be sure - making sure the delay threshold of super functions are larger than subs (failed)
// tried a different operation - create comment (failed)
// tried executing operation through node with auth instead of via prisma directly (failed)
// upgraded Apollo npm packages to present day latest (failed)
