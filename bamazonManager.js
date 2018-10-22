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

const footer = '======================================================================'
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
    console.log(`${footer}`)
    
    startApp();
  });
}

const viewLowInventory = () => {
  connection.query("SELECT * FROM products WHERE stock_quantity <= 10 ORDER by stock_quantity DESC", function (err, res) {
    if (err) throw (err);
    console.log(table.print(res));
    console.log(`${footer}`);

    startApp();
  });
}

const addToInventory = () => {
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw (err);
    console.log(`${footer}`)
    console.log(table.print(results));
    console.log(`${footer}`)
    inquirer
    .prompt([{
        name: "update",
        type: "list",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].product_name);
          }
          return choiceArray;
        },
        message: "Which item would you like to update?"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many units would you like to add?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ]).then(function (answer) {
      
      for (var i = 0; i < results.length; i++) {
        if (results[i].product_name === answer.update) {
  
        var chosenItem = results[i];
      }
    }
//only allows for adding quantity not taking away
      let newQty = chosenItem.stock_quantity + parseInt(answer.quantity)
      connection.query("UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: newQty
          },
          {
            id: chosenItem.id
          }
          
        ],

          function(error) {
          if (error) throw err;
  console.log(`
  New Quantity of ${newQty} confirmed
  ${footer}`);

          startApp();
        });
     })
    })

}

const addNewProduct = () => {
  console.log(`
  this isnt finished
  ${footer}`)
}

const quitApp = () => {
  console.log(`
  Goodbye
  ${footer}`)
  connection.end();
}

