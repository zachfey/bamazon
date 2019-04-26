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
            const buyQTY = answers.quantity
            const buyItem = answers.itemID

            connection.query('SELECT stock_quantity, product_name FROM products WHERE item_id = ?', [buyItem], function(err, res){
                if(err) throw err;
                // console.log(res[0]);
                const stock = res[0].stock_quantity;
                const item = res[0].product_name;
                
                if(buyQTY > stock){
                    console.log("\nSorry, we only have " + stock + ' ' + item + 's left in stock.');
                } else{

                    if(buyQTY == 1){
                    console.log('\nOk, buying ' + buyQTY + ' ' + item);
                    } else{
                        console.log('\nOk, buying ' + buyQTY + ' ' + item + 's');
                    }

                    connection.query('UPDATE products SET stock_quantity  = (? - ?) WHERE item_id = ?', [stock, buyQTY, buyItem], function(err, res){
                        if(err) throw err;
                        console.log('\nDatabase updated!')
                        connection.end();

                    });
                }

            });
        })
    })
})

// However, if your store does have enough of the product, you should fulfill the customer's order.

// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase