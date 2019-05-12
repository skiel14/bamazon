CREATE DATABASE IF NOT EXISTS bamazon;
USE bamazon;

CREATE TABLE IF NOT EXISTS products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price FLOAT NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Conair Pro Hair Brush", "Beauty and Personal Care", 3.88, 156),
  ("Revlon Ceramic Flat Iron - 1 inch", "Beauty and Personal Care", 9.94, 74),
  ("Coleman Travel Sewing Kit", "Arts, Crafts & Sewing", 7.92, 143),
  ("Acrylic Paint Brush Set, 6 Packs", "Arts, Crafts and Sewing", 12.99, 128),
  ("HP Printer Paper, BrightWhite24, 8.5 x 11 Paper", "Office Products", 11.06, 99),
  ("Swingline Stapler, Commercial Desk Stapler", "Office Products", 25.81, 100),
  ("15 Culinary Herb Seed Vault - Heirloom and Non GMO", "Garden and Outdoor", 24.99, 87),
  ("The Game of Life Board Game", "Toys and Games", 19.99, 97),
  ("Super Smash Bros. Ultimate", "Video Games", 49.94, 141),
  ("The Legend of Zelda: Breath of the Wild", "Video Games", 59.99, 66);
