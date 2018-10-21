var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("easy-table");
require("dotenv").config();

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: process.env.SQL_PASSWORD,
  database: "products_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;

  welcome();

});

//connects to SQL db and checks from table "passwords" to allow manager to login.
//if password is correct the app with start
const welcome = () => {
  connection.query("SELECT * FROM passwords", function(err, results) {
    if (err) throw err;
  console.log(header)
  inquirer
  .prompt([
    {
    name: "welcome",
    type: "confirm",
    message: "Start Bamazon?"
  },
  {
    name: "login",
    type: "password",
    message: "Enter your manager password"
  },
  ]).then(answers => {
    for (var i = 0; i < results.length; i++) {
    if (answers.login === results[i].password) {
      console.log(`Hello manager your password has been accepted`)
      startApp();
    }
  
    else {
      console.log("password denied, try again")
      welcome();
    }
  }
})
})
}

    


  
const header = '==========================WELCOME TO BAMAZON=========================='

const startApp = () => {
  inquirer
  .prompt([
    {
      name: "panel",
      type: "list",
      message: "What would you like to do?",
      choices: ['View All Products', 'View Low Inventory', 'Add to Inventory', 'Add a New Product', 'Quit Manager Control Panel']
    }
  ]).then(answers => {
    switch (answers.panel) {
      case 'View All Products':
        viewAllProducts();
        break;
      case 'View Low Inventory':
        viewLowInventory();
        break;
      case 'Add to Inventory':
        addToInventory();
        break;
      case 'Add a New Product':
        addNewProduct();
        break;
      case 'Quit Manager Control Panel':
        quitApp();
    }
  })
}

const viewAllProducts = () => {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw (err);
    console.log(table.print(res));
    
    startApp();
  });
}

const viewLowInventory = () => {
  connection.query("SELECT * FROM products WHERE stock_quantity <= 10", function (err, res) {
    if (err) throw (err);
    console.log(table.print(res));

    startApp();
  });
}

const addToInventory = () => {
  console.log(`this isnt finished`)
}

const addNewProduct = () => {
  console.log(`this isnt finished`)
}

const quitApp = () => {
  console.log("Goodbye")
  connection.end();
}

