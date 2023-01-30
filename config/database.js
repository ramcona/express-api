//import library
let mysql = require("mysql");

//variable
let connection = mysql.createConnection({
    host: 'localhost',
    user:   'root',
    password:  'root',
    database: 'test_express',
    port: 8889,
});

//check connection
connection.connect(function(error){
    if(!!error){
        console.log(error);
    }else{
        console.log("Connection Successfully");
    }
});

module.exports = connection;