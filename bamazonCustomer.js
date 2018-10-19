var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "products_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;

  startApp();
 
});

const header = '==========================WELCOME TO BAMAZON=========================='

const startApp = () => {
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(`
      ${header}
      ID: ${res[i].id}
      Product Name: ${res[i].product_name}
      Department Name: ${res[i].department_name}
      Price: ${res[i].price}
      Quantity in Stock: ${res[i].stock_quantity}

      `);
    }
  });
}
