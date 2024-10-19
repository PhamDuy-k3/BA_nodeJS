import jwt from "jsonwebtoken";
import moment from "moment";

export const generateRefreshToken = (
  data,
  secretKey = process.env.ACCESS_TOKEN_SECRET
) => {
  const payload = {
    ...data,
    iat: moment().unix(),
  };

  // Tạo token với thời gian hết hạn là 1 phút
  const token = jwt.sign(payload, secretKey, {
    algorithm: "HS256",
    expiresIn: "1h",
  });

  return token;
};
