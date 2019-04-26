const mysql = require('mysql');
const inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'zachary',
    database: 'bamazon'
})

connection.connect(function(err){
    if(err) throw err;
    console.log('connected!\n------------------------------------------------------');
    connection.query('SELECT * FROM products', function(err, res){
        if(err) throw err;

        console.log('Welcome to Bamazon!\n\nWe have the following items for sale:\n');
        
        for (let i in res){
            console.log('Item ' + res[i].item_id + ': ' + res[i].product_name +' for only $' + (res[i].price/100).toFixed(2) + ' each. Act fast, only ' + res[i].stock_quantity + ' remain!');
        }

        inquirer.prompt([{
            message: 'Which item would you like to buy? (Please enter the item ID)',
            type: 'prompt',
            name: 'itemID'
        }, 
        {
            message: 'How many would you like?',
            name: 'quantity'
        }
    ]).then(function(answers){
            console.log('OK, buying ' + answers.quantity + ' of item ' + answers.itemID);
            connection.query('SELECT stock_quantity, product_name FROM products WHERE item_id = ?', [answers.itemID], function(err, res){
                if(err) throw err;
                console.log(res[0]);
                const stock = res[0].stock_quantity;
                const item = res[0].product_name;
                if(answers.quantity > stock){
                    console.log("Sorry, we only have " + stock + ' ' + item + 's');
                }
                connection.end();

            });
        })
    })
})

// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.



// However, if your store does have enough of the product, you should fulfill the customer's order.

// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase