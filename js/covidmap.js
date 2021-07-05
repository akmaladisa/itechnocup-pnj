var mymap = L.map('covidMapping').setView([51.505, -0.09], 2.5);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
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
                }).addTo(mymap);
    
                L.marker([latitude, longitude], {icon: iconVirus}).addTo(mymap)
                .bindPopup(
                    `<img src='${element.countryInfo.flag}'> <br/>
                    <h1>${element.country}</h1>
                    <h3>Cases: <b>${element.cases}</b></h3>
                    <h3>Deaths: <b>${element.deaths}</b></h3>
                    <h3>Recovered: <b>${element.recovered}</b></h3>
                    `
                    
                    )
                .openPopup();
    
            } )
    
        } )
}

updateMapWorld();