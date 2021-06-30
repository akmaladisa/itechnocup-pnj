// API URL
// https://corona.lmao.ninja/v2/countries/
// API URL

window.addEventListener('load', function() {
    setInterval(() => {
        document.querySelector('body').classList.remove('loading');
    }, 500);
})

const apiURL = "https://corona.lmao.ninja/v2/countries/";
const covidSearch = document.querySelector("#covidSearch")
const search = document.querySelector("#search");

function formatNumber( num ) {
    return String( num ).replace( /(.)(?=(\d{3})+$)/g, "$1," ); //REGEX to formating number casees with comma
}

async function getCovidData() {
    const apiResponse = await fetch( apiURL );
    const data = await apiResponse.json();
    return data;
}

async function getCovidDataPerCountry( country ) {
    const apiResponse = await fetch(`https://corona.lmao.ninja/v2/countries/${country}`);
    const data = await apiResponse.json();

    //UI RESULT IN ARRAY
    searchResultUI([data]);
}

function searchResultUI( data ) {
    const searchResult = document.querySelector( ".search__result" );

    //looping data from API
    for( const item of data ) {
        loader( searchResult ); //Start Loading GIF

        setTimeout( () => {

            searchResult.innerHTML = 
            `
            <div class="card rounded mb-5" data-aos="fade-up" data-aos-duration="10000" id="cardCountry">
                <img src="${item.countryInfo.flag}" class="img-fluid" alt="...">
                <div class="card-header text-center border border-dark border-1">
                    <h5 class="card-title">${item.country}</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item text-danger">
                        <i class="bx bxs-virus-block bx-spin text-danger fs-4 me-3"></i><b>Confirmed:</b> <span id="sconfirmed">${item.cases}</span> 
                    </li>
                    <li class="list-group-item text-dark">
                        <i class="bx bxs-sad bx-flashing text-dark fs-4 me-3"></i><b>Deaths:</b> <span id="sdeaths">${item.deaths}</span> 
                    </li>
                    <li class="list-group-item text-success">
                        <i class="bx bxs-smile bx-tada text-success fs-4 me-3"></i><b>Recovered:</b> <span id="srecovered">${item.recovered}</span> 
                    </li>
                    <li class="list-group-item text-body">
                        <i class="bx bx-health bx-burst text-body fs-4 me-3"></i><b>Critical:</b> <span id="scritical">${item.critical}</span> 
                    </li>
                </ul>
            </div>
            `;
            searchNumStatEffect( { sconfirmed, sdeaths, srecovered, scritical }, item )
        }, 2000 )
    }
}

async function worldIndoData() {
    const response = await getCovidData();
    const worldStatEl = document.querySelector( ".world__status" );
    const indoStatEl = document.querySelector( ".indo__status" );

    let worldCases = 0, worldDeaths = 0, worldRecovered = 0, worldData= '';

    for( const data of response ) {
        worldData = {
            cases: ( worldCases += data.cases ),
            deaths: ( worldDeaths += data.deaths ),
            recovered: ( worldRecovered += data.recovered )
        }
    }
    
    worldStatEl.innerHTML = 
    `
    <div class="status__item col-lg-3 col-md-3 col-sm-4 my-2" data-aos="fade-right" data-aos-duration="2000">
        <p class="confirmed text-danger fs-5 fw-bold">Confirmed</p>
        <i class="fs-1 bx bxs-virus bx-spin" style="color: red;"></i>
        <h2 id="wconfirmed" class="fs-4">${worldData.cases}</h2>
    </div>
    <div class="status__item col-lg-3 col-md-3 col-sm-4 my-2" data-aos="fade-down" data-aos-duration="2005">
        <p class="deaths text-dark fs-5 fw-bold">Deaths</p>
        <i class="fs-1 bx bxs-sad bx-flashing" style="color: black;"></i>
        <h2 id="wdeaths" class="fs-4">${worldData.deaths}</h2>
    </div>
    <div class="status__item col-lg-3 col-md-3 col-sm-4 my-2" data-aos="fade-left" data-aos-duration="2010">
        <p class="recovered text-success fs-5 fw-bold">Recovered</p>
        <i class="fs-1 bx bxs-happy bx-tada" style="color: green;"></i>
        <h2 id="wrecovered" class="fs-4">${worldData.recovered}</h2>
    </div>  
    `;
    worldNumStatEffect( { wconfirmed, wdeaths, wrecovered }, worldData ); //Count UP animation for world cases

    response.forEach((res) => {
        if (res.country === "Indonesia") {
        indoStatEl.innerHTML = `
            <div class="status__item col-lg-3 col-md-3 col-sm-4 my-2" data-aos="fade-right" data-aos-duration="2000">
                <p class="confirmed text-danger fs-5 fw-bold">Confirmed</p>
                <i class="fs-1 bx bxs-virus bx-spin" style="color: red;"></i>
                <h2 id="iconfirmed" class="fs-4">${res.cases}</h2>
            </div>
            <div class="status__item col-lg-3 col-md-3 col-sm-4 my-2" data-aos="fade-down" data-aos-duration="2005">
                <p class="deaths text-dark fs-5 fw-bold">Deaths</p>
                <i class="fs-1 bx bxs-sad bx-flashing" style="color: black;"></i>
                <h2 id="ideaths" class="fs-4">${res.deaths}</h2>
            </div>
            <div class="status__item col-lg-3 col-md-3 col-sm-4 my-2" data-aos="fade-left" data-aos-duration="2010">
                <p class="recovered text-success fs-5 fw-bold">Recovered</p>
                <i class="fs-1 bx bxs-happy bx-tada" style="color: green;"></i>
                <h2 id="irecovered" class="fs-4">${res.recovered}</h2>
            </div>    
            `;
    
        indoNumStatEffect({ iconfirmed, ideaths, irecovered }, res);
        }
    });
}

function worldNumStatEffect( id, data ) {
    const confirmed = new CountUp( id.wconfirmed, 0, data.cases );
    const deaths = new CountUp( id.wdeaths, 0, data.deaths );
    const recovered = new CountUp( id.wrecovered, 0, data.recovered );

    //start count up effect
    confirmed.start();
    deaths.start();
    recovered.start();
}

function indoNumStatEffect( id, data ) {
    const confirmed = new CountUp( id.iconfirmed, 0, data.cases );
    const deaths = new CountUp( id.ideaths, 0, data.deaths );
    const recovered = new CountUp( id.irecovered, 0, data.recovered );

    //start count up effect
    confirmed.start();
    deaths.start();
    recovered.start();
}

function searchNumStatEffect( id, data ) {
    const confirmed = new CountUp( id.sconfirmed, 0, data.cases );
    const deaths = new CountUp( id.sdeaths, 0, data.deaths );
    const recovered = new CountUp( id.srecovered, 0, data.recovered );
    const critical = new CountUp( id.scritical, 0, data.critical );

    //start count up effect
    confirmed.start();
    deaths.start();
    recovered.start();
    critical.start();
}

function showErrorMessage( message ) {
    const smallEl = document.createElement( "small" );
    smallEl.classList.add( "error" );
    smallEl.textContent( message );
    covidSearch.insertBefore( smallEl, covidSearch.lastChild );

    setTimeout(() => {
        smallEl.remove();
    }, 2200);
}

function loader(searchResult) {
    const loader = document.createElement("i");
    // loader.className = "loader";
    // loader.src = "img/loading.gif";
    loader.classList.add( "bx", "bxs-virus-block", "bx-spin", "text-danger", "virus-loader", "mt-4" )

    covidSearch.insertBefore(loader, covidSearch.lastChild);

    searchResult.innerHTML = "";

    setTimeout(() => {
        loader.remove();
    }, 2000);
}

//document loaded
document.addEventListener( "DOMContentLoaded", worldIndoData)

//search country event
covidSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    console.log(searchTerm);

    if (!searchTerm) {
    showErrorMessage("Please enter a country");
    } else {
        getCovidDataPerCountry(searchTerm);
    }

    search.value = '';
    matchList.innerHTML = '';
    
});


// SEARCH LIVE GLOBAL
// const searchCountry = document.getElementById('search');
const matchList = document.getElementById('match-list');

//SEARCH COUNTRY FROM API
const searchState = async searchText => {
    const res = await fetch( 'https://corona.lmao.ninja/v2/countries/' );
    const states = await res.json();

    // mencocokan hasil dengan inputan
    let matches = states.filter( state => {
        const regex = new RegExp(search.value, 'i');
        return state.country.match(regex);
    } );

    if( searchText.length === 0 ) {
        matches = [];
        matchList.innerHTML = '';
    }

    outputHtml( matches );
} 

//show results in html
const outputHtml = matches => {
    if(matches.length > 0) {
        const html = matches.map( match => `
            <li class="list-group-item link-class">
                <h6 class="countryName">${match.country}</h6>
            </li>
        ` ).slice(0, 5).join('');
        matchList.innerHTML = html;
    }
}

search.addEventListener( 'input', () => searchState( search.value ) );

