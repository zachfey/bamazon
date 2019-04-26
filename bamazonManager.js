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

inquirer.prompt([{
    message: 'What would you like to do?',
    choices: [choice1, choice2, choice3, choice4],
    type: 'list',
    name: 'action'
}]).then(function(answer){

    switch(answer.action){
        case choice1:
            return console.log(choice1);
        case choice2:
            return console.log(choice2);
        case choice3:
            return console.log(choice3);
        case choice4:
            return console.log(choice4);
    }
})
// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.

// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.

// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.

// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.