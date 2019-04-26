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

        console.log('Welcome to Bamazon!\n\nWe have the following items for sale:\n');

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
    ]).then(function(ans){
        connection.query('UPDATE products SET stock_quantity  = stock_quantity + ? WHERE item_id = ?', [ans.qtyAdd, ans.itemAdd], function (err) {
            if (err) throw err;
            console.log('Inventory updated!');
        });
        connection.end();
    });
    
}

function addProduct() {
    console.log(choice4);
    connection.end();
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

// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.

// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.