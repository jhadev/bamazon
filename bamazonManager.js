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
  console.log(`this isnt finished`)
}