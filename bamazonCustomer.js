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
connection.connect(function (err) {
  if (err) throw err;

  startApp();

});

const header = '==========================WELCOME TO BAMAZON=========================='

const startApp = () => {
  connection.query("SELECT * FROM products", function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(`
      ${header}
      ID: ${res[i].id}
      Product Name: ${res[i].product_name}
      Department Name: ${res[i].department_name}
      Price: ${res[i].price}
      Quantity in Stock: ${res[i].stock_quantity}

      `);
      //inquirer function goes here
    }
    questions();
  });
}

const questions = () => {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
  inquirer
    .prompt([{
        name: "purchase",
        type: "list",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].product_name);
          }
          return choiceArray;
        },
        message: "Which item would you like to purchase?"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many units would you like you purchase?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function (answer) {
      var chosenItem;
      for (var i = 0; i < results.length; i++) {
        if (results[i].product_name === answer.purchase) {
  
          chosenItem = results[i];
      }
    }


     if (chosenItem.stock_quantity >= parseInt(answer.quantity)) {

      let newQty = chosenItem.stock_quantity - parseInt(answer.quantity)
      console.log(newQty)
      connection.query(
        "UPDATE products SET ? WHERE ?",
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
          console.log("Order Confirmed");
          startApp();
        }
      );
      }
     else {
      console.log("Insufficient Quantity")
      questions();
     }

    });
  })
}