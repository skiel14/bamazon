var mysql = require("mysql");
var inquirer = require("inquirer");
var conTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "kielio14",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;

  displayItems();
});

function displayItems() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) {
      throw err;
    }
    console.table(res);

    shoppingCart(res);
  });
}

function shoppingCart(inventory) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "itemID",
        message: "What is the ID number of the product you would like to buy? Press 'ctrl + c' to exit.",
        validate: function (ans) {
          return !isNaN(ans);
        }
      }
    ])
    .then(function (ans) {
      var id = parseInt(ans.itemID);
      var item = availability(id, inventory);

      if (item) {
        howMuch(item);
      } else {
        console.log("That item is not in our Bamazon inventory. Try another item.");
        displayItems();
      }
    });
}

function availability(id, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === id) {
      return inventory[i];
    }
  }
  return null;
}

function howMuch(item) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "amount",
        message: "How many would you like? Press 'ctrl + c' to exit.",
        validate: function (ans) {
          return ans > 0;
        }
      }
    ])
    .then(function (ans) {
      var amount = parseInt(ans.amount);
      if (amount > item.stock_quantity) {
        console.log("Insufficient quantity!");
        displayItems();
      } else {
        buyIt(item, amount);
      }
    });
}

function buyIt(item, amount) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [amount, item.item_id],
    function (err, res) {
      console.log("Enjoy your purchace of " + amount + " " + item.product_name + "'s! What would you like to buy next?");
      displayItems();
    }
  );
}
