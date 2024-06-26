import moment from "moment";
import userModel from "../models/user.model.js";
import crypto from "node:crypto"; // mã hóa
import { hashString } from "../commons/hash-data.js";
import { generateToken } from "../commons/generate-token.js";

export default class AuthController {
  async login(req, res) {
    try {
      const { phone, password } = req.body;
      const user = await userModel.findOne({ phone });
      if (!user) {
        throw new Error("phone ko chính xác");
      }

      const passwordHashed = hashString(password);

      if (passwordHashed !== user.password) {
        throw new Error("Pass ko chính xác");
      }

      res.json({
        user_token: generateToken({ id: user._id }),
        phone_user: user.phone,
      });
    } catch (error) {
      res.json({
        error: {
          message: error.message,
        },
      });
    }
  }
}
