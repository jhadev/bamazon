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
    startApp()
    });
}

const header = '==========================WELCOME TO BAMAZON=========================='