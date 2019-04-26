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
}

function viewLowInv() {
    console.log(choice2);
}

function stockProduct() {
    console.log(choice3);
}

function addProduct() {
    console.log(choice4);
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
        connection.end();
    })
})

// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.

// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.

// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.