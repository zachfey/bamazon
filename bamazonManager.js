const mysql = require('mysql');
const inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'zachary',
    database: 'bamazon'
})

const choice1 = 'View Products for Sale'
const choice2 = 'View Low Inventory'
const choice3 = 'Add to Inventory'
const choice4 = 'Add New Product'

function viewProducts() {
    console.log(choice1);
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        console.log('\nCurrent Inventory:');
        console.table(res);

    })
    connection.end();
}

function viewLowInv() {
    console.log(choice2);
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        let lowInv = [];
        for (let i in res) {
            if (res[i].stock_quantity < 5) {
                lowInv.push(res[i])
            }
        }
        console.table(lowInv);
        connection.end();
    })
}

function stockProduct() {
    console.log(choice3);
    inquirer.prompt([{
        message: 'Which item would you like to add more of? (enter item ID)',
        name: 'itemAdd'
    },
    {
        message: 'How much would you like to add?',
        name: 'qtyAdd'
    }
    ]).then(function (ans) {
        connection.query('UPDATE products SET stock_quantity  = stock_quantity + ? WHERE item_id = ?', [ans.qtyAdd, ans.itemAdd], function (err) {
            if (err) throw err;
            console.log('Inventory updated!');
        });
        connection.end();
    });

}

function addProduct() {
    console.log(choice4);
    let departments = [];
    connection.query('SELECT department_name FROM departments', function(err, res){
        if (err) throw err;
        for (let i in res){
            departments.push(res[i].department_name);
        }
        // console.log(departments)

    })
    inquirer.prompt([{
        message: 'What is the name of the product?',
        name: 'name'
    },
    {
        message: 'What deparment is the product in?',
        type: 'list',
        choices: departments,
        name: 'department'
    },
    {
        message: 'What is its price? (use X.XX format)',
        name: 'price'
    },
    {
        message: 'How many do we have?',
        name: 'qty'
    }
    ]).then(function(ans){
        connection.query('INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)', [ans.name, ans.department, (ans.price * 100), ans.qty], function(err, res){
            if (err) throw err;
            console.log(ans.qty + ' of ' + ans.name + ' added to ' + ans.department + ' at $' + ans.price + ' ea.')
            connection.end();
        })
    })
}

inquirer.prompt([{
    message: 'What would you like to do?',
    choices: [choice1, choice2, choice3, choice4],
    type: 'list',
    name: 'action'
}]).then(function (answer) {
    connection.connect(function (err) {
        if (err) throw err;

        switch (answer.action) {
            case choice1:
                return viewProducts();
            case choice2:
                return viewLowInv();
            case choice3:
                return stockProduct();
            case choice4:
                return addProduct();
        }

    })
})