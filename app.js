let sortDirection = false;

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '230234f211msh8dd6d8c2374c270p164240jsnad194c9e1b6a',
		'X-RapidAPI-Host': 'covid-19-statistics.p.rapidapi.com'
	}
};

const tableCtn = document.querySelector('.trtr');
const userInput = document.querySelector('input');
const btn = document.querySelector('button');
const hideHeaders = document.querySelector('.container')
const loader = document.querySelector('#loading');
let cityData

function displayLoading() {
    hideHeaders.classList.remove('display');
    loader.classList.add('display');
    setTimeout(() => {
        loader.classList.remove('display');
    }, 5000);
}

function hideLoading() {
    loader.classList.remove('display');
    hideHeaders.classList.add('display');
}

function sortCounfirm () {
    cityData.sort((a , b) => {
        return b.confirmed - a.confirmed;
    });
}

let params = ''

const callParams = () => {
    params = userInput.value 
    displayLoading();
    fetch(`https://covid-19-statistics.p.rapidapi.com/reports?region_name=${params}`, options)
    .then(response => response.json())
    .then(function diplayItems (items) {
        cityData = items.data
        let tableData = "";
        let displayCountry = cityData.map(function(item){
            sortCounfirm ()
            return `
        <tr>
            <td>${item.region.province}</td>
            <td>${item.date}</td>
            <td>${item.confirmed}</td>
            <td>${item.deaths}</td>
            <td>${item.active}</td>
            <td>${item.fatality_rate}</td>
            <td>${item.last_update}</td>
        </tr>          
            `
        });
        displayCountry = displayCountry.join('');
        hideLoading();
        tableCtn.innerHTML = displayCountry;
    })
    
}


btn.addEventListener('click', callParams)
userInput.addEventListener('keyup', function(e){
    if (e.key === "Enter") {
        callParams();
    }
});

