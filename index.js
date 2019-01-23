var pg = require('pg');
var express = require('express');
var app = express();

app.get('/', function (req, res, next) {
    var client = new pg.Client({
        user: 'postgresqldbuser@bmagnodejs-postgresqldbserver',
        host: 'bmagnodejs-postgresqldbserver.postgres.database.azure.com',
        database: 'postgresqldatabase7545',
        //password: '',  -- Instead of embedding the password into the code, set
        //  this environment variable instead, "PGPASSWORD= your_secret_password"
        
        //  For Windows: > SET PGPASSWORD=...
        //      Test Windows: > echo %PGPASSWORD%
        //  For Linux: $ export PGPASSWORD= ...
        //      Test Linux: $ echo $PGPASSWORD

        //  ... or use KeyVault.
        port: 5432,
    });
    client.connect(function(err) {
        if(err) {
            console.log("not able to get a connection "+ err);
            res.status(400).send(err);
        }                 
    });
    client.query('SELECT values FROM appdata WHERE value_id = 1;', (err, result) => {
        client.end(); // closing the connection;
        if(err) {
            console.log(err, result);
            res.status(400).send(err);
        }
        res.status(200).send("Hello  " + result.rows[0].values + "!");
    });
}); 

var port = process.env.PORT || 1337; 
app.listen(port);
console.log("Server running at http://localhost:%d", port);
