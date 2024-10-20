import Joi from "joi";
export default function UpdateUserMiddleware(req, res, next) {
  const data = req.body; // lấy dũ liệu từ người dùng gửi lên

  const schema = Joi.object({
    name: Joi.string().max(50).messages({
      "string.base": "Tên là 1 chuỗi.",
      "string.max": "Tên không được vượt quá {{#limit}} ký tự.",
    }),
    phone: Joi.string().max(11).min(9).messages({
      "string.base": "Phone là 1 chuỗi.",
      "string.max": "Số điện thoại không được vượt quá {{#limit}} ký tự.",
      "string.min": "Số điện thoại không được ít hơn {{#limit}} ký tự.",
    }),
    email: Joi.string().max(50).email().messages({
      "string.base": "Email là 1 chuỗi.",
      "string.max": "Email không được vượt quá {{#limit}} ký tự.",
      "string.email": "Email không hợp lệ, vui lòng kiểm tra lại.",
    }),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).messages({
      "string.base": "Mật khẩu phải là một chuỗi.",
      "string.pattern.base":
        "Mật khẩu không hợp lệ, chỉ chấp nhận các ký tự chữ cái (viết hoa hoặc viết thường) và chữ số.",
    }),
    gender: Joi.number().valid(1, 2).messages({
      "number.base": "Gender là 1 số.",
      "any.only": "Giới tính không hợp lệ.",
    }),
    level: Joi.number().valid(1, 2).messages({
      "number.base": "lever là 1 số.",
      "any.only": "lever không hợp lệ.",
    }),
    birthday: Joi.date().less("now").messages({
      "date.base": "Ngày sinh phải là kiểu ngày tháng.",
      "date.less": "Ngày sinh không được lớn hơn ngày hiện tại.",
    }),
    address: Joi.string().max(50).messages({
      "string.base": "Địa chỉ phải là chuỗi.",
      "string.max": "Địa chỉ không được vượt quá {{#limit}} ký tự.",
    }),
    province_id: Joi.alternatives().try(
      Joi.string().messages({
        "string.base": "Province ID phải là chuỗi hoặc số.",
      }),
      Joi.number().messages({
        "number.base": "Province ID phải là chuỗi hoặc số.",
      })
    ),
    isVerified: Joi.boolean().default(false).messages({
      "boolean.base": "isVerified phải là giá trị true hoặc false.",
    }),
    verificationCode: Joi.string().allow(null, "").messages({
      "string.base": "verificationCode phải là một chuỗi.",
    }),
    codeExpired: Joi.date().messages({
      "date.base": "codeExpiredphải là kiểu ngày tháng.",
    }),
    district_id: Joi.alternatives().try(
      Joi.string().messages({
        "string.base": "district_id phải là chuỗi hoặc số.",
      }),
      Joi.number().messages({
        "number.base": "district_id phải là chuỗi hoặc số.",
      })
    ),
    town_id: Joi.alternatives().try(
      Joi.string().messages({
        "string.base": "town_id phải là chuỗi hoặc số.",
      }),
      Joi.number().messages({
        "number.base": "town_id phải là chuỗi hoặc số.",
      })
    ),
  });

  const result = schema.validate(data);

  if (result.error) {
    return res.status(422).json(result.error.details);
  }
  next();
}
