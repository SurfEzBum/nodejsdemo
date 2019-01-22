var http = require('http');
var pg = require('pg');
var app = express();

var connectionString = "host=bmagnodejs-postgresqldbserver.postgres.database.azure.com port=5432 dbname=postgresqldatabase7545 user=postgresqldbuser@bmagnodejs-postgresqldbserver password={your_password} sslmode=required"

app.get('/', function (req, res, next) {
    pg.connect(connectionString, function(err, client, done) {
        if(err) {
            console.log("not able to get a connection "+ err);
            res.status(400).send(err);
        }
        client.query('Select * from ...', [1], function(error, result) {  // TODO - create database table
            done(); // closing the connection;
            if(err) {
                console.log(err);
                res.status(400).send(err);
            }
            res.status(200).send(result.rows);
        });         
    });
}); 

var server = http.createServer(function(request, response) {

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello World!");

});

var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
