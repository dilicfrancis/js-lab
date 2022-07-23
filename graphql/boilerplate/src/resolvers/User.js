import getUserID from "../utils/getUserID";

const User = {
  email: {
    fragment: "fragment userID on User {id}", //fragment-keyword variable-name (userID) on-keyword type (User) {selections (id)}
    resolve(parent, args, { request }, info) {
      const userID = getUserID(request, false);
      if (userID && parent.id === userID) {
        return parent.email;
      }
      return null;
    },
  },
};

export default User;
