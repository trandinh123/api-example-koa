const _ = require("lodash");
const render = require("koa-ejs");
import {
  getAll as getAllProducts,
  getOne as getOneProduct,
  add as addProduct,
  remove as removeProduct,
  update as updateProduct,
  getSome as getSomeProducts,
  sort as sortProducts,
  getFields as getProductFields,
} from "../../database/productReposity";

export async function save(ctx) {
  try {
    const newProduct = ctx.request.body;
    addProduct(newProduct);
    ctx.status = 201;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      message: e.message,
    });
  }
}

export async function getProducts(ctx) {
  try {
    const { limit, sortBy } = ctx.request.query;
    let products = [];

    if (sortBy) {
      products = sortProducts(sortBy);
    } else {
      products = getAllProducts();
    }

    if (limit) {
      products = getSomeProducts(products, limit);
    }

    ctx.body = {
      data: products,
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      message: e.message,
    };
  }
}

export async function getProduct(ctx) {
  try {
    const { id } = ctx.params;
    let getCurrentProduct = getOneProduct(id);
    const { fields } = ctx.request.query;

    if (getCurrentProduct) {
      if (fields) {
        getCurrentProduct = getProductFields(
          getCurrentProduct,
          fields.split(",")
        );
      }
      return (ctx.body = {
        data: getCurrentProduct,
      });
    }
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      message: `No product with id ${id}`,
    });
  } catch (e) {
    ctx.body = {
      success: false,
      message: e.message,
    };
  }
}

export async function update(ctx) {
  try {
    const { id } = ctx.params;
    const data = ctx.request.body;
    updateProduct(data, id);
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      message: e.message,
    });
  }
}
export async function remove(ctx) {
  try {
    const { id } = ctx.params;
    removeProduct(id);
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      message: e.message,
    });
  }
}

export async function renderAllProduct(ctx) {
  const products = getAllProducts();
  await ctx.render("products", {
    products: products,
  });
}

export async function renderOneProduct(ctx) {
  const { id } = ctx.params;
  const product = getOneProduct(id);
  await ctx.render("singleProduct", {
    product,
  });
}
