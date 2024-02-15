const connection = require("./connection/db.js");
const inquirer = require("inquirer");

function init() {
  inquirer
    .prompt([
      {
        name: "option",
        type: "list",
        message: "What action would you like to take?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a new department",
          "Add a new role",
          "Add an employee",
          "Update employee roles",
          "Exit",
        ],
      },
    ])
    .then(function (response) {
      switch (response.option) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a new department":
          addDepartment();
          break;
        case "Add a new role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update employee roles":
          updateEmployee();
          break;
        case "exit":
          connection.end();
          break;
      }
    });
}








init()