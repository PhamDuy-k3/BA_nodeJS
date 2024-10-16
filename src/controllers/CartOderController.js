import cartOderModel from "../models/cartOder.model.js";
import sendOrderConfirmationEmail from "../utils/orderEmail.js";
import crypto from "node:crypto";

const confirmationTokens = {};

export default class CartOderController {
  async create(req, res) {
    try {
      const data = req.body;
      if (req.authUser) {
        const id_user = req.authUser?._id;
        data.id_user_oder = id_user.toString();
      }
      const cart = await cartOderModel.create(data);
      if (cart) {
        res.status(201).json({
          data: cart,
          status_code: 201,
          errors: [],
        });
        sendOrderConfirmationEmail(cart.gmail, cart);
      }
    } catch (error) {
      console.error("Error creating cart order:", error);
      res.status(500).json({
        error: {
          message: error.message,
        },
      });
    }
  }
  async show(req, res) {
    try {
      const { orderId } = req.params;
      const order = await cartOderModel.findById(orderId);
      res.json({
        data: order,
      });
    } catch (error) {
      res.json(error);
    }
  }
  s;
  async update(req, res) {
    try {
      const data = req.body;
      const { cartOrderId } = req.params;
      const cartOrder = await cartOderModel.findById(cartOrderId);

      if (!cartOrder) {
        return res.status(404).json({
          error: {
            message: "Đơn hàng trong giỏ hàng không tồn tại",
          },
        });
      }

      const cartOrderUpdate = await cartOderModel.findByIdAndUpdate(
        cartOrderId,
        data,
        { new: true }
      );

      res.status(200).json({
        data: cartOrderUpdate,
        status_code: 200,
      });
    } catch (error) {
      console.error("Error updating cart order:", error);
      res.status(500).json({
        error: {
          message: error.message,
        },
      });
    }
  }

  async index(req, res) {
    try {
      const { status, startDate, endDate } = req.query;

      const id_user_oder = req.authUser?._id.toString();
      const conditions = {};
      // Lọc theo ID người dùng
      if (id_user_oder) {
        conditions.id_user_oder = id_user_oder;
      }
      if (status) {
        conditions.status = status;
      }

      // Lọc theo khoảng thời gian
      if (startDate && endDate) {
        conditions.confirmedAt = {
          $gte: new Date(startDate).setHours(0, 0, 0, 0),
          $lte: new Date(endDate).setHours(23, 59, 59, 999),
        };
      } else if (startDate) {
        conditions.confirmedAt = {
          $gte: new Date(startDate).setHours(0, 0, 0, 0),
          $lte: new Date(startDate).setHours(23, 59, 59, 999),
        };
      }

      const carts = await cartOderModel.find(conditions);

      res.status(200).json({ data: carts, status_code: 200 });
    } catch (error) {
      console.error("Error fetching cart orders:", error);
      res.status(500).json({
        error: {
          message: error.message,
        },
      });
    }
  }
  async indexAdmin(req, res) {
    try {
      const { status, startDate, endDate } = req.query;
      console.log(startDate, endDate);
      const conditions = {};
      // Lọc theo ID người dùng
      if (status) {
        conditions.status = status;
      }

      // Lọc theo khoảng thời gian
      if (startDate && endDate) {
        conditions.confirmedAt = {
          $gte: new Date(startDate).setHours(0, 0, 0, 0),
          $lte: new Date(endDate).setHours(23, 59, 59, 999),
        };
      } else if (startDate) {
        conditions.confirmedAt = {
          $gte: new Date(startDate).setHours(0, 0, 0, 0),
          $lte: new Date(startDate).setHours(23, 59, 59, 999),
        };
      }

      const carts = await cartOderModel.find(conditions);

      res.status(200).json({ data: carts, status_code: 200 });
    } catch (error) {
      console.error("Error fetching cart orders:", error);
      res.status(500).json({
        error: {
          message: error.message,
        },
      });
    }
  }
  async sendOrderInformationViaEmail(req, res) {
    const orderDetails = req.body;
    // Gửi email xác nhận
    try {
      await sendOrderConfirmationEmail(orderDetails.gmail, orderDetails);
      res
        .status(200)
        .send("Đơn hàng đã được đặt. Vui lòng kiểm tra email để xác nhận.");
    } catch (error) {
      console.error("Error sending order confirmation email:", error);
      res.status(500).json({
        error: {
          message: "Có lỗi xảy ra khi gửi email xác nhận.",
        },
      });
    }
  }
}
