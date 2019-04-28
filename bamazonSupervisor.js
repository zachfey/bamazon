const mysql = require('mysql');
const inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'zachary',
    database: 'bamazon'
})

const choice1 = 'View Product Sales by Department'
const choice2 = 'Create New Department'

function viewSales() {
    console.log(choice1);
    const query = 'SELECT ' + 
            'department_id, ' +
            'department_name, ' +
            'overhead_costs, '+
            'SUM(IF(products.department_name = departments.department_name, product_sales, 0)) AS total_sales, '+
            'SUM(IF(products.department_name = departments.department_name, product_sales, 0))-overhead_costs AS total_profit ' +
        'FROM ' +
            'departments ' +
        'INNER JOIN ' +
            'products USING (department_name) ' +
        'GROUP BY department_name;'

    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
    })
    connection.end();
}

function createDepartment() {
    console.log(choice2);
    inquirer.prompt([{
        message: 'What is the name of the department?',
        name: 'name'
    },
    {
        message: 'What are its overhead costs?',
        name: 'costs'
    }
    ]).then(function(ans){
        connection.query('INSERT INTO departments (department_name, overhead_costs) VALUES (?, ?)', [ans.name, ans.costs], function(err, res){
            if (err) throw err;
            console.log(ans.name + ' added with an overhead cost of $' + ans.costs)
            connection.end();
        })
    })
}

inquirer.prompt([{
    message: 'What would you like to do?',
    choices: [choice1, choice2],
    type: 'list',
    name: 'action'
}]).then(function (answer) {
    connection.connect(function (err) {
        if (err) throw err;

        switch (answer.action) {
            case choice1:
                return viewSales();
            case choice2:
                return createDepartment();
        }

    })
})