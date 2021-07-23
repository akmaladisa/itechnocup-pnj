// SHOW PROVINSI LIST
function showOptionTag(e)
{
    return `
    <option value="${e.id}">${e.name}</option>
    `
}

function fetchProvinsi()
{
    let penampungOption = `<option value="" disabled selected>Provinsi...</option>`;
    fetch("https://rs-bed-covid-api.vercel.app/api/get-provinces")
        .then( response => response.json() )
        .then( data => {

            // GUNAKAN provinsiData untuk di looping
            let provinsiData = data.provinces;

            provinsiData.forEach( e => {
                penampungOption += showOptionTag(e)
            } )

            document.getElementById("selectProvinsi").innerHTML = penampungOption;

        } )
}

// EKSEKUSI
window.addEventListener('load', function(){
    fetchProvinsi();
})

// SHOW CITY LIST SESUAI PROVINSI YANG SUDAH DIPILIH
document.getElementById("selectProvinsi")
    .addEventListener("input", function() { 

            let penampungOption = `<option value="" disabled selected>Kabupaten / Kota...</option>`;

            fetch(`https://rs-bed-covid-api.vercel.app/api/get-cities?provinceid=${document.getElementById("selectProvinsi").value }`)
                .then( response => response.json() )
                .then( data => {
                    
                    let cityData = data.cities;
    
                    cityData.forEach( e => {
                        penampungOption += showOptionTag(e)
                    } )
    
                document.getElementById("selectCity").innerHTML = penampungOption;
                    
                } )
            
            document.getElementById("selectCity").removeAttribute("disabled");
    })

// ENABLED BUTTON CARI KETIKA KOTA DIPILIH
document.getElementById("selectCity")
    .addEventListener("input", function(){
        document.getElementById("btnHospital").removeAttribute("disabled");
    })

// CARI RANJANG RUMAH SAKIT DI KOTA YANG SUDAH DITENTUKAN
function makeListRS(e)
{
    return `
    <div class="card text-center mb-5">
        <div class="card-header text-white fw-bold bg-chocolate">
            <h5 class="text-white">${e.name}</h5>
        </div>
        <div class="card-body text-start">
            <div class="row d-flex justify-content-between">
                <div class="col-8 text-start">
                    <p class="text-chocolate">${e.address}</p>
                    <a href="tel:${(e.phone)? e.phone : ''}" class="${(e.phone)? '': 'disabled'} mb-2 me-1 btn p-2 bg-chocolate text-white">
                        <i class='bx bxs-phone-call text-white fw-bold fs-3 me-1'></i>${(e.phone)? e.phone : '-' }
                    </a>
                    <a class="btn mb-2 p-2 bg-chocolate text-white" onclick="redirectMap(${e.id})">
                        <i class='bx bxs-location-plus fs-3'></i>
                    </a>
                </div>
                <div class="col-4 text-center font-monospace">
                    <span class="${ (e.bed_availability)? 'text-success' : 'text-danger' }">Tersedia: ${ (e.bed_availability)? e.bed_availability : '-' }</span>
                    <small class="${ (e.queue)? 'text-warning' : 'text-primary' }">Antrean: ${ (e.queue)? e.queue : '-' }</small>
                    <a class="bg-transparent text-chocolate fw-bold btn p-2" data-bs-toggle="modal" data-bs-target="#RSDetail" onclick="detailRS(${e.id})">
                        <i class='bx bxs-message-alt-detail fs-3'></i>Detail
                    </a>
                </div>
            </div>
        </div>
        <div class="card-footer text-muted fs-6">
            ${e.info}
        </div>
    </div>
    `
}

function loaderRS()
{
    const loader = document.createElement("h2");
    loader.classList.add( "bx", "bxs-virus-block", "bx-spin", "text-danger", "virus-loader", "mt-3", "text-center", "fs-1" );
    document.getElementById("hospitalContainer").appendChild(loader)

    setTimeout(() => {
        loader.remove();
    }, 2222);
}

function searchHospital()
{
    // LOADING WHILE FETHCING RS LIST
    loaderRS();

    fetch(`https://rs-bed-covid-api.vercel.app/api/get-hospitals?provinceid=${document.getElementById("selectProvinsi").value}&cityid=${document.getElementById("selectCity").value}&type=${document.getElementById("bedType").value}`)
        .then( response => response.json() )
        .then( data => {
            
            let daftarRS = data.hospitals

            let penampungRS = ``;
            daftarRS.forEach(e => {
                penampungRS += makeListRS(e);
            })

            document.getElementById("hospitalContainer").innerHTML = penampungRS;

        } )
}

function makeDetailList(e)
{
    return `
    <div class="mb-5 container-fluid border border-secondary border-2 rounded shadow p-3 mb-5">
        <div class="row">
            <div class="col-12 text-center text-chocolate">
                <h4 class="mb-2">${e.stats.title}</h4>
                <div class="d-flex flex-wrap justify-content-around">
                    <div class="text-white fw-bold text-center bg-primary p-2 rounded shadow-sm p-3 mb-5">
                        <h5>Tempat Tidur</h5>
                        <h6>${e.stats.bed_available}</h6>
                    </div>
                    <div class="text-white fw-bold text-center bg-success p-2 rounded shadow-sm p-3 mb-5">
                        <h5>Kosong</h5>
                        <h6>${e.stats.bed_empty}</h6>
                    </div>
                    <div class="text-white fw-bold text-center bg-warning p-2 rounded shadow-sm p-3 mb-5">
                        <h5>Antrean</h5>
                        <h6>${e.stats.queue}</h6>
                    </div>
                </div>
                <small class="text-muted font-monospace">Time: ${e.time}</small>
            </div>
        </div>
    </div>
    `
}

function loaderRSDetail()
{
    const loader = document.createElement("h2");
    loader.classList.add( "bx", "bxs-virus-block", "bx-spin", "text-danger", "virus-loader", "mt-3", "text-center", "fs-1" );
    document.getElementById("hospitalDetail").appendChild(loader)

    setTimeout(() => {
        loader.remove();
    }, 2222);
}

function detailRS(id)
{
    loaderRSDetail();
    fetch(`https://rs-bed-covid-api.vercel.app/api/get-bed-detail?hospitalid=${id}&type=${document.getElementById("bedType").value}`)
        .then( response => response.json() )
        .then( data => {

            let detailDataRS = data.data;
            
            let penampungDetailRS =
            `
                <h5 class="text-chocolate">${detailDataRS.name}</h5>
                <p class="fs-6 font-monospace text-chocolate">${detailDataRS.address}</p>
                <a href="tel:${(detailDataRS.phone)? detailDataRS.phone : ''}" class="${(detailDataRS.phone)? '': 'disabled'} me-1 btn p-2 bg-chocolate text-white mb-4">
                    <i class='bx bxs-phone-call text-white fw-bold fs-3 me-1'></i>${(detailDataRS.phone)? detailDataRS.phone : '-' }
                </a>
            `
            
            let bedDetail = detailDataRS.bedDetail;

            bedDetail.forEach(e => {
                penampungDetailRS += makeDetailList(e)
            })

            document.getElementById("hospitalDetail").innerHTML = penampungDetailRS;
        } )
}

// redirect _blank sesuai lokasi RS di GMaps
function redirectMap(id)
{
    fetch(`https://rs-bed-covid-api.vercel.app/api/get-hospital-map?hospitalid=${id}`)
        .then( response => response.json() )
        .then( data => {
            let linkGmaps = data.data.gmaps;
            window.open(linkGmaps, '_blank');
        }  )
}