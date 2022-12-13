import ApolloBoost from "apollo-boost";

const client = (token) =>
  new ApolloBoost({
    uri: "http://localhost:" + process.env.PORT,
    request(ops) {
      if (token) {
        ops.setContext({
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    },
  });

export default client;
