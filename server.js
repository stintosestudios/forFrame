/*
 *  server.js for "forFrame.js" ( https://github.com/stintosestudios/forFrame )
 *
 *   This just provides a simple static server for the project.
 *
 */

var http = require("http"),
fs = require("fs"),
port = process.argv[2] || 8888;

http.createServer(function (req, res) {

    var filename = req.url != '/' ? '.' + req.url : 'index.html';

    fs.readFile(filename, "binary", function (err, file) {
        if (err) {

            res.writeHead(500, {
                "Content-Type" : "text/plain"
            });
            res.write(err + "\n");
            res.end();
            return;
        }

        res.writeHead(200);
        res.write(file, "binary");
        res.end();
    });

}).listen(parseInt(port, 10));

console.log('server.js is alive.');