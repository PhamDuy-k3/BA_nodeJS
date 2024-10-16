import { userRouter } from "./users_router.js";
import { productRouter } from "./products_router.js";
import { categoriesRouter } from "./categories_router.js";
import { brandsRouter } from "./brands_router.js";
import { authRouter } from "./auth.router.js";
import { cartRouter } from "./cart.router.js";
import { cartOderRouter } from "./cartOder.router.js";
import { discountcodeRouter } from "./discountcode_router.js";
import { commentRouter } from "./comment_router.js";
import { paymentRouter } from "./payment_router.js";
import { ChatRouter } from "./chat_router.js";
export const router = (app) => {
  userRouter(app);
  productRouter(app);
  categoriesRouter(app);
  brandsRouter(app);
  authRouter(app);
  cartRouter(app);
  cartOderRouter(app);
  discountcodeRouter(app);
  commentRouter(app);
  paymentRouter(app);
  ChatRouter(app);
};
