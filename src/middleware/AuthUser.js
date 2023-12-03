import jwt from "jsonwebtoken";
export const dynamic = "force-dyanmic";

const AuthUser = async (request) => {
  const token = request.headers.get("Authorization")?.split(" ")[1];

  if (!token) return false;

  console.log(token);

  try {
    const extractAuthUserInfo = jwt.verify(token, "default_secret_key");

    if (extractAuthUserInfo) return extractAuthUserInfo;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default AuthUser;
