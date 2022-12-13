import getUserID from "../utils/getUserID";

const Query = {
  allUsers(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
    };
    if (args.query) {
      opArgs.where = {
        name_contains: args.query.toLowerCase(),
      };
    }
    return prisma.query.users(opArgs, info);
  },
  allPosts(parent, args, { prisma }, info) {
    const opArgs = {
      where: { published: true },
      first: args.first,
      skip: args.skip,
      after: args.skip,
      orderBy: args.orderBy,
    };
    if (args.query) {
      opArgs.where.OR = [
        { title_contains: args.query.toLowerCase() },
        { body_contains: args.query.toLowerCase() },
      ];
    }
    return prisma.query.posts(opArgs, info);
  },
  allComments(parent, { first, skip, after, orderBy }, { prisma }, info) {
    return prisma.query.comments({ first, skip, after, orderBy }, info);
  },
  async user(parent, args, { prisma, request }, info) {
    const userID = getUserID(request);
    return prisma.query.user({ where: { id: userID } });
  },
  async userPosts(parent, args, { prisma, request }, info) {
    const userID = getUserID(request);
    const opArgs = {
      where: { author: { id: userID } },
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
    };
    if (args.query) {
      opArgs.where.OR = [
        { title_contains: args.query.toLowerCase() },
        { body_contains: args.query.toLowerCase() },
      ];
    }
    return prisma.query.posts(opArgs, info);
  },
  async post(parent, { id }, { prisma, request }, info) {
    const userID = getUserID(request, false);
    const posts = await prisma.query.posts(
      { where: { id, OR: [{ published: true }, { author: { id: userID } }] } },
      info
    );
    if (posts.length === 0) throw new Error("no post found!");
    return posts[0];
  },
};

export default Query;
