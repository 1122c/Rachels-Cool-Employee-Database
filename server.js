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
        case "Exit":
          connection.end();
          break;
      }
    });
}

// Add function needs insert command
function addDepartment(){
    inquirer.prompt([
        {
            type: "input",
            name: "new_department",
            message: "Please enter the name of the new department."
        }
    ]).then(response =>{
        connection.query("INSERT INTO department SET ?", {
            
                name: response.new_department
            
        })
        init()
    })
}

// view functions cite mysql connection to enable queries
function viewDepartments(){
    connection.query("SELECT * FROM department", (err, res)=>{
        if (err) throw err 
        console.table(res)
        init()
    })
}

function viewRoles() {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
}

function viewEmployees() {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
}







init()