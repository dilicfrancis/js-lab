import ApolloBoost, { gql } from "apollo-boost";

const client = new ApolloBoost({
  uri: "http://localhost:4000",
});

const getUsers = gql`
  query {
    allUsers {
      name
    }
  }
`;

const getPosts = gql`
  query {
    allPosts {
      title
      author {
        name
      }
    }
  }
`;

client
  .query({
    query: getUsers,
  })
  .then((res) => {
    let html = "";
    res.data.allUsers.forEach((user) => {
      html += `
        <div>
            <h2>${user.name}</h2>
        </div>
        `;
    });
    document.getElementById("users").innerHTML = html;
  });

client
  .query({
    query: getPosts,
  })
  .then((res) => {
    let html = "";
    res.data.allPosts.forEach((post) => {
      html += `
        <div>
            <h2>${post.title} by ${post.author.name}</h2>
        </div>
        `;
    });
    document.getElementById("posts").innerHTML = html;
  });
