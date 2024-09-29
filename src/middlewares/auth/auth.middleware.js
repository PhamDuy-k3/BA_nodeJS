import moment from "moment";
import userModel from "../../models/user.model.js";
import { DecodeToken } from "../../commons/decode-token.js";

export default async function AuthMiddleware(req, res, next) {
  try {
    const authorization = req.headers.authorization;
    // Kiểm tra header authorization có tồn tại
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        error: {
          message: "Unauthorized",
        },
      });
    }
    const { header, payload } = DecodeToken(authorization);

    const user = await userModel.findById(payload.id);
    if (!user) {
      return res.status(404).json({
        error: {
          message: "User ko tồn tại",
        },
      });
    }
    // Kiểm tra token đã hết hạn
    if (moment().unix() > payload.exp) {
      return res.status(500).json({
        error: {
          message: "Internal server error",
        },
      });
    }

    // Lưu thông tin người dùng vào request để sử dụng trong các middleware sau
    req.authUser = user;
    next();
  } catch (error) {
    return res.status(500).json({
      error: {
        message: "Internal server error",
      },
    });
  }
}
