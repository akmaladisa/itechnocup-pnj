var mymapProvinsi = L.map('mapprovinsi').setView([-3.423267, 114.652871], 5);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGhlY29kZXl4IiwiYSI6ImNrcmM0cTl0azFjdjkydXA4ajdsejY0d3YifQ.De4-h_ETwU2hP4mVeQc5uQ', {
                    maxZoom: 18,
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
                        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    id: 'mapbox/streets-v11',
                    tileSize: 512,
                    zoomOffset: -1
                }).addTo(mymapProvinsi);


function mapProvinsiUpdate()
{
    fetch("https://apicovid19indonesia-v2.vercel.app/api/indonesia/provinsi/more")
        .then( response => response.json() )
        .then( data => {

            data.forEach( element => {

                let provLat = element.lokasi.lat;
                let provLong = element.lokasi.lon;

                let markerColor = `rgb(${element.kasus / 150}, 0, 0)`;

                L.circle([provLat, provLong], {
                    color: markerColor,
                    fillColor: `rgb(${element.cases / 950}, 0, 0)`,
                    fillOpacity: 0.5,
                    radius: 120000
                }).addTo(mymapProvinsi).bindPopup(
                    `
                    <div class='popUp'>
                        <h6 class="mt-2">${element.provinsi}</h6>
                        <h6 class='text-danger'>Cases: <b>${formatNumber(element.kasus)}</b></h6>
                        <h6 class='text-body'>Deaths: <b>${formatNumber(element.meninggal)}</b></h6>
                        <h6 class='text-success'>Recovered: <b>${formatNumber(element.sembuh)}</b></h6>
                    </div>
                    `
                    );

                L.marker([provLat, provLong]).addTo(mymapProvinsi)
                .bindPopup(
                    `
                    <div class='popUp'>
                        <h6 class="mt-2">${element.provinsi}</h6>
                        <h6 class='text-danger'>Cases: <b>${formatNumber(element.kasus)}</b></h6>
                        <h6 class='text-body'>Deaths: <b>${formatNumber(element.meninggal)}</b></h6>
                        <h6 class='text-success'>Recovered: <b>${formatNumber(element.sembuh)}</b></h6>
                    </div>
                    `
                    )

            } )

        } )
}

mapProvinsiUpdate();