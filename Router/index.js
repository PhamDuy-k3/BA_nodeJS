import { userRouter } from "./users_router.js";
import { productRouter } from "./products_router.js";
import { categoriesRouter } from "./categories_router.js";
import { brandsRouter } from "./brands_router.js";
import { authRouter } from "./auth.router.js";
export const router = (app) => {
  userRouter(app);
  productRouter(app);
  categoriesRouter(app);
  brandsRouter(app);
  authRouter(app);
};
