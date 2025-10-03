async function get_json(){
    await fetch("https://pollapi.it3.iktim.no/poll").then(response => {return response.json()}).then(data =>{


        const labels = [];
        const votes = [];

        const oldCanvas = document.getElementById('poll');
        oldCanvas.remove();

        const newCanvas = document.createElement('canvas');
        newCanvas.id = 'poll';
        newCanvas.width = 400;
        newCanvas.height = 200;

        document.body.appendChild(newCanvas);

        data.cells.forEach(cell => {
            labels.push(cell.name);
            votes.push(cell.votes);
        });


        //pain
        const ctx = document.getElementById('poll').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: data.name,
                    data: votes,
                    backgroundColor: ['red','blue'] // can generate dynamically too
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        suggestedMax: 10
                    }
                }
            },
        });


    });
}