import { v4 as uuidv4 } from "uuid";

//--Four arguments available for resolvers: parent, args, context-ctx, info
const Mutation = {
  createUser(parent, args, { db }, info) {
    if (db.users.some((user) => user.email === args.user.email))
      throw new Error("email already taken");

    const user = {
      id: "user-" + uuidv4(),
      ...args.user,
    };

    db.users.push(user);
    return user;
  },

  updateUser(parent, { id, userData }, { db }, info) {
    const user = db.users.find((user) => user.id === id);
    if (!user) throw new Error("Invalid User");
    if (typeof userData.email === "string") {
      const email = db.users.some((user) => user.email === userData.email);
      if (email) throw new Error("this email is not available");
      user.email = userData.email;
    }
    if (typeof userData.name === "string") {
      user.name = userData.name;
    }

    if (typeof userData.age !== "undefined") {
      user.age = userData.age;
    }
    return user;
  },

  deleteUser(parent, args, { db }, info) {
    const userIndex = db.users.findIndex((user) => user.id === args.id);
    if (userIndex === -1) throw new Error("Invalid user");

    //deletes user
    const user = db.users.splice(userIndex, 1);
    //deletes post
    db.posts = db.posts.filter((post) => {
      const match = post.author === args.id;
      //and comments associated with the post being deleted
      if (match)
        db.comments = db.comments.filter((comment) => comment.post !== post.id);
      //returns new array without the user
      return !match;
    });
    //deletes other comments associated with the deleted user
    db.comments = db.comments.filter((comment) => comment.author !== args.id);

    return user[0];
  },

  createPost(parent, args, { db, pubsub }, info) {
    if (!db.users.some((user) => user.id === args.post.author))
      throw new Error("Provide a valid author");

    const post = {
      id: "post-" + uuidv4(),
      ...args.post,
    };

    if (post.published)
      pubsub.publish("posts", {
        posts: { mutation: "CREATED", data: post },
      });

    db.posts.push(post);
    return post;
  },

  updatePost(parent, { id, postData }, { db, pubsub }, info) {
    const post = db.posts.find((post) => post.id === id);
    const originalPost = { ...post };
    if (!post) throw new Error("Invalid Post");
    if (typeof postData.title === "string") {
      post.title = postData.title;
    }
    if (typeof postData.body === "string") {
      post.body = postData.body;
    }

    if (typeof postData.published === "boolean") {
      post.published = postData.published;

      if (originalPost.published && !post.published) {
        pubsub.publish("posts", {
          posts: { mutation: "DELETED", data: originalPost },
        });
      } else if (!originalPost.published && post.published) {
        pubsub.publish("posts", {
          posts: { mutation: "CREATED", data: post },
        });
      } else if (originalPost.published && post.published) {
        pubsub.publish("posts", {
          posts: { mutation: "UPDATED", data: post },
        });
      }
    } else if (post.published) {
      pubsub.publish("posts", {
        posts: { mutation: "UPDATED", data: post },
      });
    }

    return post;
  },

  deletePost(parent, args, { db, pubsub }, info) {
    const postIndex = db.posts.findIndex((post) => post.id === args.id);
    if (postIndex === -1) throw new Error("Invalid post");

    const [post] = db.posts.splice(postIndex, 1);
    db.comments = db.comments.filter((comment) => comment.post !== args.id);

    if (post.published)
      pubsub.publish("posts", {
        posts: { mutation: "DELETED", data: post },
      });

    return post;
  },

  // deletePost(parent, args, ctx, info) {
  //   const postIndex = posts.findIndex((post) => post.id === args.id);
  //   if (postIndex === -1) throw new Error("Invalid post");

  //   const post = posts[postIndex];
  //   //deletes post
  //   posts = posts.filter((post) => {
  //     const match = post.id === args.id;
  //     //and comments associated with the post being deleted
  //     if (match)
  //       comments = comments.filter((comment) => comment.post !== post.id);
  //     //returns new array without the user
  //     return !match;
  //   });

  //   return post;
  // },

  createComment(parent, args, { db, pubsub }, info) {
    if (!db.users.some((user) => user.id === args.comment.author))
      throw new Error("Provide a valid author");

    if (
      !db.posts.some((post) => post.id === args.comment.post && post.published)
    )
      throw new Error("Provide a valid post");

    const comment = {
      id: "comment-" + uuidv4(),
      ...args.comment,
    };

    pubsub.publish(`comments - ${args.comment.post}`, {
      comments: { mutation: "CREATED", data: comment },
    });

    db.comments.push(comment);
    return comment;
  },

  updateComment(parent, { id, commentData }, { db, pubsub }, info) {
    const comment = db.comments.find((comment) => comment.id === id);
    if (!comment) throw new Error("Invalid Comment");
    if (typeof commentData.text === "string") {
      comment.text = commentData.text;
    }

    pubsub.publish(`comments - ${comment.post}`, {
      comments: { mutation: "UPDATED", data: comment },
    });

    return comment;
  },

  deleteComment(parent, args, { db, pubsub }, info) {
    const commentIndex = db.comments.findIndex(
      (comment) => comment.id === args.id
    );
    if (commentIndex === -1) throw new Error("Invalid comment");

    const [comment] = db.comments.splice(commentIndex, 1);

    pubsub.publish(`comments - ${comment.post}`, {
      comments: { mutation: "DELETED", data: comment },
    });

    return comment;
  },
};

export default Mutation;
