const Query = {
  allUsers(parent, args, { db }, info) {
    if (!args.query) return db.users;
    return db.users.filter((user) =>
      user.name.toLowerCase().includes(args.query.toLowerCase())
    );
  },
  allPosts(parent, args, { db }, info) {
    if (!args.query) return db.posts;
    return db.posts.filter(
      (post) =>
        post.title.toLowerCase().includes(args.query.toLowerCase()) ||
        post.body.toLowerCase().includes(args.query.toLowerCase())
    );
  },
  user() {
    return {
      id: "HUK234",
      name: "Pooky",
      email: "hound@email.com",
      age: 43,
    };
  },
  post() {
    return {
      id: "RT38",
      title: "In Sense Scent",
      body: "This is the belly of Jonah the fishman",
      published: false,
    };
  },
  comment(parent, args, { db }, info) {
    return db.comments;
  },
};

export default Query;
