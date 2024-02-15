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




function addRole() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    //asking for title, salary and department id 
    inquirer.prompt([
      {
        name: "title",
        type: "input",
        message: "What is the title of the new role?"
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary for the new role?",
      },
      {
        name: "departmentId",
        type: "list",
        message: "Select a department Id for this role",
        choices: [1,2,3,4]
      }
    ]).then(function (response) {
      
      connection.query("INSERT INTO role SET ?",
        {
          title: response.title,
          salary: response.salary,
          department_id: response.departmentId
        },
        function (err, res) {
          if (err) throw err;
          console.log("New role created.");
          init();
        }
      );
    });
  })
};

function addEmployee() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    inquirer.prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the new employee's first name?"
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the new employee's last name?"
      },
      {
        name: "roleId",
        type: "list",
        choices: [1,2,3,4],
        message: "Select a role id for the new employee"
      }
    ]).then(function (response) {
     
      connection.query("INSERT INTO employee SET ?",
        {
          first_name: response.first_name,
          last_name: response.last_name,
          role_id: response.roleId,
          manager_id: 1
        }, function (err, res) {
          if (err) throw err;
          console.log("New employee added to database")
          init();
        })
    })
  })
};







init()