const databaseConfig = require("./config.js");
const mysql = require("mysql");
const speedtest = require("speedtest-net");
const schedule = require("node-schedule");

var conn = mysql.createConnection(databaseConfig.DB_CONFIG);
conn.connect((err) => {
    if (err) throw err;
});

schedule.scheduleJob("DoSpeedTest", " 0 */2 * * *", () => {
    var test = speedtest({ maxTime: 5000 });
    test.on('data', data => {
        // Gotten Data Object must insert into database
        var dataToInsert = {
            upload: data.speeds.upload,
            download: data.speeds.download,
            ping: data.server.ping
        }
        conn.query("INSERT INTO posts SET ?", dataToInsert, (err) => {
            if (err) throw err;
        });
    });
}); 