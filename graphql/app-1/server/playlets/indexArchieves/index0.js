import { GraphQLServer } from "graphql-yoga";

//Type definitions (Schema)
//--Scalar Types (single values): String, Boolean, Int, Float, ID
//--Custom Types (collections value): Array, Objects
const typeDefs = `
type Query {
    opening(name: String): String!
    addOne(a:Float!, b:Float!): Float
    addMany(numbers:[Float!]):Float!
    bracket: [String!]!
    user: User!
    post: Post!
}

type User {
  id: ID!
  name: String!
  email: String!
  age: Int
}

type Post {
  id: ID!
  title: String!
  body: String!
  published: Boolean!
}
`;

//Resolvers
//--Four arguments available for resolvers: parent, args, context-ctx, info
const resolvers = {
  Query: {
    opening(parent, args) {
      if (args.name) return `Hello ${args.name}`;
      return "hey there";
    },
    addOne(parent, args, ctx, info) {
      if (args.a && args.b) return args.a + args.b;
      return null;
    },
    addMany(parent, args, ctx, info) {
      if (args.numbers.length === 0) return 0;
      return args.numbers.reduce(
        //the reduce function is never triggered if an array has only a single value.
        (accumulator, currentValue) => accumulator + currentValue
      );
    },
    bracket(parent, args, ctx, info) {
      return ["A", "B", "C", "D", "Z"];
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
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log("Server is up on 4000!"));
