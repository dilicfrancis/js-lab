import bcrypt from "bcryptjs";
import getUserID from "../utils/getUserID";
import generateToken from "../utils/generateToken";
import hashPassword from "../utils/hashPassword";

//JWT
// const token = jwt.sign({ id: 46 }, "Abydos");
// console.log(token);

// const decode = jwt.decode(token);
// console.log(decode);

// const verify = jwt.verify(token, "Abydos");
// console.log(verify);

// //Bcrypt
// const dummy = async () => {
//   const dummyEmail = "email@example.com";
//   const dummyPassword = "kaffka";
//   const hashedPassword = await bcrypt.hash(dummyPassword, 10);
//   const isMatch = await bcrypt.compare(dummyPassword, hashedPassword);
//   console.log(isMatch);
// };
// dummy();

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

  createPost(parent, { postData }, { prisma, request }, info) {
    const userID = getUserID(request);
    return prisma.mutation.createPost(
      {
        data: { ...postData, author: { connect: { id: userID } } },
      },
      info
    );
  },

  async updatePost(parent, { id, postData }, { prisma, request }, info) {
    const userID = getUserID(request);
    const postExists = await prisma.exists.Post({ id, author: { id: userID } });
    if (!postExists) throw new Error("Post does not exist!");

    if (postData.published === false) {
      await prisma.mutation.deleteManyComments({ where: { post: { id } } });
    }
    return prisma.mutation.updatePost(
      {
        where: { id },
        data: postData,
      },
      info
    );
  },

  async deletePost(parent, { id }, { prisma, request }, info) {
    const userID = getUserID(request);
    const postExists = await prisma.exists.Post({ id, author: { id: userID } });
    if (!postExists) throw new Error("Post not found!");
    return prisma.mutation.deletePost({ where: { id } }, info);
  },

  async createComment(parent, { commentData }, { prisma, request }, info) {
    const userID = getUserID(request);
    const postExists = await prisma.exists.Post({
      published: true,
      id: commentData.post,
    });

    if (!postExists) throw new Error("Post does not exist!");

    return prisma.mutation.createComment(
      {
        data: {
          ...commentData,
          post: { connect: { id: commentData.post } },
          author: { connect: { id: userID } },
        },
      },
      info
    );
  },

  async updateComment(parent, { id, commentData }, { prisma, request }, info) {
    const userID = getUserID(request);
    const commentExists = await prisma.exists.Comment({
      id,
      author: { id: userID },
    });
    if (!commentExists) throw new Error("comment does not exist!");
    return prisma.mutation.updateComment(
      {
        where: { id },
        data: commentData,
      },
      info
    );
  },

  async deleteComment(parent, { id }, { prisma, request }, info) {
    const userID = getUserID(request);
    const commentExists = await prisma.exists.Comment({
      id,
      author: { id: userID },
    });
    if (!commentExists) throw new Error("comment does not exist");
    return prisma.mutation.deleteComment({ where: { id } }, info);
  },
};

export default Mutation;
