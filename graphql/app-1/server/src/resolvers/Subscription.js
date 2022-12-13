import getUserID from "../utils/getUserID";

const Subscription = {
  comments: {
    subscribe(parent, { postID }, { prisma }, info) {
      return prisma.subscription.comment(
        {
          where: { node: { post: { id: postID } } },
        },
        info
      );
    },
  },
  posts: {
    subscribe(parent, args, { prisma }, info) {
      return prisma.subscription.post(
        { where: { node: { published: true } } },
        info
      );
    },
  },
  userPosts: {
    subscribe(parent, args, { prisma, request }, info) {
      const userID = getUserID(request);
      return prisma.subscription.post(
        { where: { node: { author: { id: userID } } } },
        info
      );
    },
  },
};

export default Subscription;
