var express = require('express');
var app = express();
var socketServer = require('http').createServer(app);
var io = require('socket.io')(socketServer);
app.listen(process.env.PORT || 3000);
var gps = require("gps-tracking");
var options = {
    'debug': true,
    'port': 8090,
    'device_adapter': "TK218"
}
console.log("http server started at port 3000");
console.log("gps server started at port 8090");

app.use(express.static('site/public'));
app.get('/', function (req, res) {
    console.log("Accessing Homepage");
    // res.sendFile('index.htm', { root: "Books-bootstrap-website-master/src/" });
    res.send("The Fixbot Server is active");

});
socketServer.on('listening', function (device) {
    console.log('ok, Server is running');

});

io.on('connection', function (data) {
    console.log('ok, Server is running');

});



var server = gps.server(options, function (device, connection) {
    console.log('Activating GPS Server on Port 8090');
    connection.on("data", function (res) {
        console.log('\n\n\n');
        console.log(device.getUID());
        console.log("Requesting Access");
    })
    connection.on("end", function (res) {
        console.log('\n\n\n');
        console.log("Device ");
        console.log(device.getUID());
        console.log("Disconnected");
    })
    /******************************
     LOGIN
     ******************************/
    device.on("login_request", function (device_id, msg_parts) {
        console.log("Hi! i'm login_request", device_id);
        this.login_authorized(true); //Accept the login request.
    });

    device.on("login", function () {
        console.log("Hi! i'm " + device.uid);
    });
    //PING -> When the gps sends their position  
    device.on("ping", function (data) {

        //After the ping is received, but before the data is saved
        console.log(data);
        return data;

    });

});
server.setDebug(true);


// var express = require('express');
// var app = express();
// var socketServer = require('http').createServer(app);
// var io = require('socket.io')(socketServer);
// app.listen(process.env.PORT || 3000);


// app.use(express.static('site/public'));
// app.get('/', function (req, res) {
//     console.log('Access to Homepage Granted');
//     // res.sendFile('index.htm', { root: "Books-bootstrap-website-master/src/" });
//     res.send("The Fixbot Server is active");

// });

// socketServer.on('listening', function (device) {
//     console.log('ok, server is running');
// });

// handle the event sent with socket.send()

// io.on('connection', function (clientSocket) {
//     console.log('a user connected');
//     clientSocket.on('disconnect', function () {
//         console.log('user disconnected');
//     });
// });
// io.on('connection', function (data) {
    
// });












