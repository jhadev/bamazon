DROP DATABASE IF EXISTS products_db;
CREATE DATABASE products_db;

USE products_db;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (id)
);

