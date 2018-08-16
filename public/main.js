const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
var socket;

function onload() {
    socket = io(window.location.href);
    socket.on('initChartData', (todayChartData) => {
        var downloads = [];
        var uploads = [];
        var labels = [];
        var pings = [];
        todayChartData.forEach(element => {
            downloads.push(element.download);
            uploads.push(element.upload);
            pings.push(element.ping);
            var date = new Date(Date.parse(element.time));
            var dayName = date.toString().split(' ')[0];
            // labels.push(monthNames[date.getMonth() - 1] + " " + date.getDay() + ", " + date.getHours() + ":" + date.getMinutes());
            labels.push(dayName + ", " + date.getHours() + ":" + date.getMinutes());

        });

        uploadDownloadChart = new Chart(document.getElementById('uploadDownloadChart'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: "Downloads",
                    backgroundColor: 'rgba(255, 99, 132,0)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: downloads,
                }, {
                    label: "Uploads",
                    backgroundColor: 'rgba(99, 132, 255, 0)',
                    borderColor: 'rgb(99, 132, 255)',
                    data: uploads,
                }]
            },
        });

        pingChart = new Chart('pingChart', {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: "Ping",
                    backgroundColor: 'rgba(255, 200, 0,0)',
                    borderColor: 'rgb(255, 200, 0)',
                    data: pings,
                }]
            },
        })
    })

}
