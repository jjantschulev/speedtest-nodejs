const databaseConfig = require("./config.js");
const mysql = require("mysql");
const speedtest = require("speedtest-net");
const schedule = require("node-schedule");
const express = require("express");
const app = express();
const server = app.listen(3001, () => { console.log('Speedtest server running on port 3001'); });
app.use(express.static("public"));
const io = require('socket.io')(server);


// SOCKET.IO COMMUNICATION

io.on('connection', (socket) => {
    // Get data from server;
    conn.query("SELECT * FROM (SELECT ping, upload, download, time FROM tests ORDER BY time DESC LIMIT 24) as foo ORDER BY foo.time ASC", (err, data) => {
        if (err) throw err;
        socket.emit('initChartData', data);
    });
})


// CONNECTION TO DATABASE
var conn = mysql.createConnection(databaseConfig.DB_CONFIG);
conn.connect((err) => {
    if (err) throw err;
});

// SCHEDULE SPEEDTEST TASK
schedule.scheduleJob("DoSpeedTest", " 0 * * * *", () => {
    var test = speedtest({ maxTime: 5000 });
    test.on('data', data => {
        // Gotten Data Object must insert into database
        var dataToInsert = {
            upload: data.speeds.upload,
            download: data.speeds.download,
            ping: data.server.ping
        }
        conn.query("INSERT INTO tests SET ?", dataToInsert, (err) => {
            if (err) throw err;
        });
    });
}); 
