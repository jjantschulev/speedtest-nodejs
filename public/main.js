const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
var socket;

function onload() {
    socket = io(window.location.href);
    var chart = document.getElementById('chart');
    socket.on('initChartData', (todayChartData) => {
        var downloads = [];
        var uploads = [];
        var labels = [];
        todayChartData.forEach(element => {
            downloads.push(element.download);
            uploads.push(element.upload);
            var date = new Date(Date.parse(element.time));
            var dayName = date.toString().split(' ')[0];
            // labels.push(monthNames[date.getMonth() - 1] + " " + date.getDay() + ", " + date.getHours() + ":" + date.getMinutes());
            labels.push(dayName + ", " + date.getHours() + ":" + date.getMinutes());

        });

        chart = new Chart(chart, {
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
    })

}
