const { data: products } = require('./products');
import { writeFileSync } from 'fs'
const _ = require("lodash");

export function getAll() {
  return products;
}

export function getOne(id) {
  return products.find((product) => parseInt(id) === product.id);
}

export function add(data) {
  const updateProducts = [data, ...products];
  return writeFileSync(
    './src/database/products.json',
    JSON.stringify({
      data: updateProducts,
    })
  );
}

export function update(data, id) {
  const updateProducts = products.map(product => {
    if(product.id === parseInt(id)) {
      return {...product, ...data}
    }
    return product;
  });

  return writeFileSync(
    './src/database/products.json',
    JSON.stringify({
      data: updateProducts,
    })
  );
}

export function remove(id) {
  const updateProducts = products.filter((product) => product.id !== parseInt(id));
  return writeFileSync(
    './src/database/products.json',
    JSON.stringify({
      data: updateProducts,
    })
  );
}

export function getSome(products, limit) {
  return products.slice(0, limit)
}

export function sort(sortBy) {
  return products.sort((a, b) => {
    if (sortBy === 'asc') {
      return a.createdAt - b.createdAt;
    }
    return b.createdAt - a.createdAt;
  });
}

export function getFields(product, fields) {
  return _.pick(product, fields);
}