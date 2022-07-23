import bcrypt from "bcryptjs";
import getUserID from "../utils/getUserID";
import generateToken from "../utils/generateToken";
import hashPassword from "../utils/hashPassword";

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const password = await hashPassword(args.userData.password);
    const emailTaken = await prisma.exists.User({ email: args.userData.email });
    if (emailTaken) throw new Error("this email is already taken!");
    const user = await prisma.mutation.createUser({
      data: { ...args.userData, password },
    });
    const token = generateToken(user.id);
    return { user, token };
  },

  async updateUser(parent, { userData }, { prisma, request }, info) {
    const userID = getUserID(request);
    let password;
    if (typeof userData.password === "string") {
      password = await hashPassword(userData.password);
    }
    return prisma.mutation.updateUser(
      { where: { id: userID }, data: { ...userData, password } },
      info
    );
  },

  async deleteUser(parent, args, { prisma, request }, info) {
    const userID = getUserID(request);
    const userExists = await prisma.exists.User({ id: userID });
    if (!userExists) throw new Error("Invalid User!");
    return prisma.mutation.deleteUser({ where: { id: userID } }, info);
  },

  async loginUser(
    parent,
    { loginData: { email, password } },
    { prisma },
    info
  ) {
    const user = await prisma.query.user({ where: { email } });
    if (!user) throw new Error("Invalid login!");
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new Error("Invalid login!");
    const token = generateToken(user.id);
    return { user, token };
  },
};

export default Mutation;
