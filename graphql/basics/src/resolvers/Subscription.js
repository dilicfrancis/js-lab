const Subscription = {
  //   count: {
  //     subscribe(parent, args, { pubsub }, info) {
  //       let count = 0;

  //       setInterval(() => {
  //         count++;
  //         pubsub.publish("counter", {
  //           count,
  //         });
  //       }, 1000);

  //       return pubsub.asyncIterator("counter");
  //     },
  //   },
  comments: {
    subscribe(parent, { postID }, { db, pubsub }, info) {
      if (!db.posts.find((post) => post.id === postID && post.published))
        throw new Error("Post not found!");
      return pubsub.asyncIterator(`comments - ${postID}`);
    },
  },
  posts: {
    subscribe(parent, args, { pubsub }, info) {
      return pubsub.asyncIterator(`posts`);
    },
  },
};

export default Subscription;
