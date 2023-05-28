import jwt, { Secret } from "jsonwebtoken";

 const signToken = (type: string, id: string) => {
    if (!process.env.REACT_APP_JWT_PASSWORD) {
      throw new Error("No JWT Seed - Check Environment Variables");
    }
    return jwt.sign(
      { type, id },
      process.env.REACT_APP_JWT_PASSWORD as Secret,
      { expiresIn: "15m" }
    );
  };

  export default {signToken}