import Router from "koa-router";
import * as productHandler from "../handlers/products/productHandler";
import {
  productInputMiddleware,
  productUpdateMiddleware,
} from "../middleware/productMiddleware";
// Prefix all routes with /books
const router = new Router();

// Routes will go here
router.get("/products", productHandler.renderAllProduct);
router.get("/products/:id", productHandler.renderOneProduct);

router.get("/api/product", productHandler.getProducts);
router.get("/api/product/:id", productHandler.getProduct);
router.post("/api/product", productInputMiddleware, productHandler.save);
router.put("/api/product/:id", productUpdateMiddleware, productHandler.update);
router.delete("/api/product/:id", productHandler.remove);
export default router;
