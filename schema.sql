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

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bonk's Adventure", "Video Games", 400, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Breaking Bad The Complete Series", "Television", 50, 39);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Leather Jacket", "Clothing", 260, 18);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Soft and Luxurious Dress Socks", "Clothing", 32, 320);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple Watch", "Electronics", 300, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Red Dead Redemption 2", "Video Games", 60, 14);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Better Call Saul Season 1", "Television", 20, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bamazon Balexa NSA Microwave", "Electronics", 70, 600);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kranzjams Vol: 443", "Music", 10, 21);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kranzjams Vol: 1", "Music", 20, 2);