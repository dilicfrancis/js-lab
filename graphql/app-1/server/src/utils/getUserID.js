import jwt from "jsonwebtoken";

const getUserID = (request, requireAuth = true) => {
  const authHeader = request.request
    ? request.request.headers.authorization
    : request.connection.context.Authorization;
  if (authHeader) {
    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userID;
  }

  if (requireAuth) throw new Error("Login Required");

  return null;
};

export default getUserID;
