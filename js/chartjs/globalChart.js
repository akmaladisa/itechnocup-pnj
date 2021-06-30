async function fetch_data_first() {
    const res = await fetch('https://corona.lmao.ninja/v2/countries/');
    const data = await res.json();
    return data;
}

function formatNumber( num ) {
    return String( num ).replace(/\B(?=(\d{3})+(?!\d))/g, ","); //REGEX to formating number casees with comma
}

async function get_total_global_data() {
    const res = await fetch_data_first();

    let wholeWorldData = '', totalDeath = 0, totalCase = 0, totalRecovered = 0;
    for( const data of res )
    {
        wholeWorldData = 
        {
            cases: (totalCase += data.cases),
            deaths: (totalDeath += data.deaths),
            recovered: (totalRecovered += data.recovered)
        }
    }

    let myWorldChart = document.getElementById('worldwideChart').getContext('2d');
    let worldVisual = new Chart( myWorldChart, {

        type: 'doughnut',
        data: {
            labels: [ 'Confirmed', 'Deaths', 'Recovered' ],
            datasets: [ {
                label: 'WorldWide Covid-19',
                data: [ (wholeWorldData.cases), (wholeWorldData.deaths), (wholeWorldData.recovered) ],
                backgroundColor: [ '#EC4646', '#222831', '#9EDE73' ],
                borderWidth: 1,
                borderColor: '#777',
                hoverBorderWidth: 3,
                hoverBorderColor: '#000'
            } ]
        },
        options: {
            responsive: true,
			maintainAspectRatio: false,
            title: {
                display: false,
                text: '',
                fontSize: 12
            },
            legend: {
                display:false,
                position: 'bottom',
                labels: {
                    fontColor: '#000',
                    fontSize: 15
                }
            },
            layout: {
                padding: {
                    left:0,
                    right:0,
                    bottom:0,
                    top:0,
                },
            },
            tooltips: {
                enabled: true
            },


        }

    } )
    
    return worldVisual;
}

get_total_global_data();
