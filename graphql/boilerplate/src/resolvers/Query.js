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

  async user(parent, args, { prisma, request }, info) {
    const userID = getUserID(request);
    return prisma.query.user({ where: { id: userID } });
  },
};

export default Query;
