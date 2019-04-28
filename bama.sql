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

ALTER TABLE products MODIFY COLUMN product_sales DECIMAL(9,2);

SELECT * FROM products;

UPDATE products SET stock_quantity  = 80, product_sales = 3.00 WHERE item_id = 2;

UPDATE 
    products
SET 
    price = '700'
WHERE 
    product_name = 'coffee';


SELECT stock_quantity, product_name FROM products WHERE item_id = 10;


CREATE TABLE departments(
department_id INTEGER PRIMARY KEY auto_increment,
department_name VARCHAR(50) NOT NULL,
over_head_costs DECIMAL(6,2)
);

ALTER TABLE departments MODIFY COLUMN overhead_costs DECIMAL(9,2);

INSERT INTO departments (department_name, overhead_costs) VALUES ('produce', 1000);
INSERT INTO departments (department_name, overhead_costs) VALUES ('sports', 3000);
INSERT INTO departments (department_name, overhead_costs) VALUES ('groceries', 100000);
INSERT INTO departments (department_name, overhead_costs) VALUES ('clothing', 15000);
INSERT INTO departments (department_name, overhead_costs) VALUES ('electronics', 40000);


SELECT department_name FROM departments;

SELECT * FROM departments;

SELECT 
    department_id, 
    department_name, 
    overhead_costs,
	SUM(IF(products.department_name = departments.department_name, product_sales, 0)) AS total_sales,
    SUM(IF(products.department_name = departments.department_name, product_sales, 0))-overhead_costs AS total_profit
FROM
    departments
INNER JOIN
    products USING (department_name)
GROUP BY department_name;
    
    SELECT
  userid,
  SUM(col1) AS col1_total,
  SUM(col2) AS col2_total
FROM table
GROUP BY userid