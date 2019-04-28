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
    // connection.query('SELECT * FROM products', function (err, res) {
    //     if (err) throw err;

    //     console.log('Welcome to Bamazon!\n\nWe have the following items for sale:\n');

    //     let lowInv = [];
    //     for (let i in res) {
    //         if (res[i].stock_quantity < 5) {
    //             lowInv.push(res[i])
    //         }
    //     }
    //     console.table(lowInv);
        // connection.end();
    // })
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