DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'zachary';
USE bamazon;

CREATE TABLE products(
	item_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(20) NOT NULL,
    price INTEGER NOT NULL,
    stock_quantity INTEGER DEFAULT 0
	);
    
    SELECT * FROM products;

DELETE FROM products WHERE product_name = 'bananas';

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('television', 'electronics', 30000, 7);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('banana', 'produce', 30, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('helmet', 'sports', 2000, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('beer', 'groceries', 1000, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('gum', 'groceries', 10, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('shoe', 'clothing', 5000, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('apple', 'produce', 80, 18);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('laptop', 'electronics', 50000, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('bicycle', 'sports', 30000, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('shirt', 'clothing', 2000, 10);

SELECT * FROM products;

UPDATE 
    products
SET 
    price = '10'
WHERE 
    product_name = 'gum';


SELECT stock_quantity, product_name FROM products WHERE item_id = 10;