import { Prisma } from "prisma-binding";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4466",
});

//prisma.type.method({operation arguments}, "{selection list}")

// prisma.query
//   .users(null, "{id name posts {title}}")
//   .then((result) => console.log(JSON.stringify(result, undefined, 2)));

// prisma.query
//   .comments(null, "{id text author {id name}}")
//   .then((res) => console.log(JSON.stringify(res, undefined, 2)));

//CREATE POST
// prisma.mutation
//   .createPost(
//     {
//       data: {
//         title: "Volcano Cones",
//         body: "The cone of a volcano is an amazing thing...",
//         published: true,
//         author: {
//           connect: {
//             id: "ckvrdsvct01430943eu73qtda",
//           },
//         },
//       },
//     },
//     "{title author {name}}"
//   )
//   .then(() => prisma.query.posts(null, "{title author {name}}"))
//   .then((res) => console.log(JSON.stringify(res, undefined, 2)));

// const createUserPost = async (authorID, postData) => {
//   const userExists = await prisma.exists.User({ id: authorID });

//   if (!userExists) throw new Error("user does not exists");

//   const post = await prisma.mutation.createPost(
//     {
//       data: { ...postData, author: { connect: { id: authorID } } },
//     },
//     "{author {id name email posts {id title published}}}"
//   );

//   return post.author;
// };

// createUserPost("ckvre7wdj015j0943lxghale4", {
//   title: "Vikram's History",
//   body: "The the middle of the middle kingdom",
//   published: true,
// })
//   .then((user) => console.log(JSON.stringify(user, undefined, 2)))
//   .catch((error) => console.log(error));

//UPDATE POST
// prisma.mutation
//   .updatePost({
//     data: {
//       body: "The cone of a volcano really really really is an amazing thing. Does it contain any life?",
//       published: false,
//     },
//     where: {
//       id: "ckvslxv7500770a43m7s8ab69",
//     },
//   })
//   .then(() => prisma.query.posts(null, "{id title body published}"))
//   .then((res) => console.log(JSON.stringify(res, undefined, 2)));

const updateUserPost = async (postID, postData) => {
  const postExists = await prisma.exists.Post({ id: postID });

  if (!postExists) throw new Error("post does not exist");

  const post = await prisma.mutation.updatePost(
    {
      data: postData,
      where: { id: postID },
    },
    "{author {id name email posts {id title published}}}"
  );

  return post.author;
};

updateUserPost("ckvrfnuim01i40943u3dxmvyz", { title: "The Great Impala" })
  .then((user) => console.log(JSON.stringify(user, undefined, 2)))
  .catch((err) => console.log(err.message));

// prisma.exists
//   .Comment({
//     post: { id: "ckvrfnuim01i40943u3dxmvyz" },
//   })
//   .then((exist) => console.log(exist));
