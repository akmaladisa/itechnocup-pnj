const api = "https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json"; //CORS ERROR

// NORMAL API https://indonesia-covid-19.mathdro.id/api/provinsi/

function formatNumber( num ) {
    return String( num ).replace(/\B(?=(\d{3})+(?!\d))/g, ","); //REGEX to formating number casees with comma
}

function showCard( c ) {
        return `
            <div class="card col-md-4 col-lg-3 col-sm-12 mx-3 my-3 provinsi-card">
                <div class="card-header">
                    <h5 class="text-center card-title">${c.attributes.Provinsi}</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item text-danger">
                        <i class="bx bxs-virus-block bx-spin text-danger fs-4 me-3"></i><b>Confirmed:</b> <span id="prconfirmed">${formatNumber(c.attributes.Kasus_Posi)}</span> 
                    </li>
                    <li class="list-group-item text-dark">
                        <i class="bx bxs-sad bx-flashing text-dark fs-4 me-3"></i><b>Deaths:</b> <span id="prdeaths">${formatNumber(c.attributes.Kasus_Meni)}</span> 
                    </li>
                    <li class="list-group-item text-success">
                        <i class="bx bxs-smile bx-tada text-success fs-4 me-3"></i><b>Recovered:</b> <span id="prrecovered">${formatNumber(c.attributes.Kasus_Semb)}</span> 
                    </li>
                </ul>
            </div>
        `
}

function showCaseProvinsi() {

    fetch( api )
        .then( response => response.json() )
        .then( response => {

            const kasusProvinsi = response.features;
            kasusProvinsi.pop();

            let cards = "";

            kasusProvinsi.forEach( c => {
                cards += showCard( c )
            } );
            const kasusProvinsiContainer = document.querySelector(".case_result_provinsi")

            kasusProvinsiContainer.innerHTML = cards;
        } )
}

document.addEventListener("DOMContentLoaded", function() {
    showCaseProvinsi();
})
