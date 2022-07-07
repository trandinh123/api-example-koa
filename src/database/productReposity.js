const { data: products } = require("./products");
import { writeFileSync } from "fs";
const _ = require("lodash");

export function getAll(sortBy, limit) {
  let data = products;

  if (sortBy) {
    data = data.sort((a, b) => {
      if (sortBy === "asc") {
        return a.createdAt - b.createdAt;
      }
      return b.createdAt - a.createdAt;
    });
  }

  if (limit) {
    data = data.slice(0, limit);
  }

  return data;
}

export function getOne(id, fields) {
  let product = products.find((product) => parseInt(id) === product.id);
  if (fields) {
    return _.pick(product, fields.split(","));
  }
  return product;
}

export function add(data) {
  data.createdAt = Date.now();
  const updateProducts = [data, ...products];
  return writeFileSync(
    "./src/database/products.json",
    JSON.stringify({
      data: updateProducts,
    })
  );
}

export function update(data, id) {
  const updateProducts = products.map((product) => {
    if (product.id === parseInt(id)) {
      return { ...product, ...data };
    }
    return product;
  });

  return writeFileSync(
    "./src/database/products.json",
    JSON.stringify({
      data: updateProducts,
    })
  );
}

export function remove(id) {
  const updateProducts = products.filter(
    (product) => product.id !== parseInt(id)
  );
  return writeFileSync(
    "./src/database/products.json",
    JSON.stringify({
      data: updateProducts,
    })
  );
}
