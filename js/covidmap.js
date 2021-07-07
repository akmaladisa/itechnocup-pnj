var mymap = L.map('mapid').setView([-6.200000, 106.816666], 3.5);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWttYWxhZGlzYSIsImEiOiJja3FwenR5d3kxMWN5MnRtaGlkcWs1dWJyIn0.Ip1uKyIJTs6uvtLEAP2gcQ', {
                    maxZoom: 18,
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
                        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    id: 'mapbox/streets-v11',
                    tileSize: 512,
                    zoomOffset: -1
                }).addTo(mymap);

function updateMapWorld()
{

    fetch("https://corona.lmao.ninja/v2/countries/")
        .then( resposnse => resposnse.json() )
        .then( data => {
    
            console.log(data);
    
            data.forEach( element => {
    
                let latitude = element.countryInfo.lat;
                let longitude = element.countryInfo.long;

                let markerColor = `rgb(${element.cases * 0.01}, 0, 0)`;

                const iconVirus = L.icon( {

                    iconUrl: `${element.countryInfo.flag}`,
                    iconSize:     [35, 25], // size of the icon
                } );
    
                L.circle([latitude, longitude], {
                    color: markerColor,
                    fillColor: `rgb(${element.cases * 0.025}, 0, 0)`,
                    fillOpacity: 0.5,
                    radius: 300000
                }).addTo(mymap).bindPopup(
                    `<img src='${element.countryInfo.flag}'> <br/>
                    <h3 class="mt-2">${element.country}</h3>
                    <h6 class='text-danger'>Cases: <b>${formatNumber(element.cases)}</b></h6>
                    <h6 class='text-body'>Deaths: <b>${formatNumber(element.deaths)}</b></h6>
                    <h6 class='text-success'>Recovered: <b>${formatNumber(element.recovered)}</b></h6>
                    `
                    
                    );
    
                L.marker([latitude, longitude], {icon: iconVirus}).addTo(mymap)
                .bindPopup(
                    `<img src='${element.countryInfo.flag}'> <br/>
                    <h3 class="mt-2">${element.country}</h3>
                    <h6 class='text-danger'>Cases: <b>${formatNumber(element.cases)}</b></h6>
                    <h6 class='text-body'>Deaths: <b>${formatNumber(element.deaths)}</b></h6>
                    <h6 class='text-success'>Recovered: <b>${formatNumber(element.recovered)}</b></h6>
                    `
                    
                    )
    
            } )
    
        } )
}

updateMapWorld();

