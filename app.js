let sortDirection = false;

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '230234f211msh8dd6d8c2374c270p164240jsnad194c9e1b6a',
        'X-RapidAPI-Host': 'covid-19-statistics.p.rapidapi.com'
    }
};


const getCountryName = {
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
const countryName = document.querySelector('.countryName');
const text = document.querySelector('.confirmedCase');
const matchList = document.querySelector('#match-list');

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

// function sortCounfirm () {
//     cityData.sort((a , b) => {
//         return b.confirmed - a.confirmed;
//     }
// }

let params = ''

function searchStates(searchText) {
    fetch('https://covid-19-statistics.p.rapidapi.com/reports', getCountryName)
    .then(response => response.json())
    .then(function countryNames(items) {
        let matches = items.data.filter(item => {
            const regex = new RegExp(`^${searchText}`, 'gi');
            return item.region.name.match(regex);
        });

        const result = [];
        const map = new Map();
        for (const item of matches) {
            if(!map.has(item.region.name)) {
                if(!map.has(item.region.name)){
                    map.set(item.region.name, true);
                    result.push({
                        name: item.region.name
                    });
                }
        }
    }
        console.log(result);
    

        if (searchText.length === 0) {
            matches = [];
            matchList.innerHTML = '';
        }


        outputHtml(result);
    });
}

// show results in HTMl
const outputHtml = matches => {
    if (matches.length > 0) {
       
        const html = matches.map(match => 
            
            `
            <div class="resultsCard">
            <button  class="searchBtn" onclick="userInput.value ='${
            match.name
        }'">${
            match.name
        } </button>
            </div>
            `).join('');
            
        matchList.innerHTML = html;

        const searchBtnClear = document.querySelector('.matches');
        searchBtnClear.addEventListener('click', function () {
            matchList.innerHTML = '';
        })
    }
}


const callParams = () => {
    params = userInput.value
    displayLoading();
    fetch(`https://covid-19-statistics.p.rapidapi.com/reports?region_name=${params}`, options)
    .then(response => response.json())
    .then(function diplayItems(items) {
        cityData = items.data
        displayCountry = createRows(items.data);
    }).catch(err => console.error(err));
}   
    btn.addEventListener('click', function () {
    matchList.innerHTML = '';
    callParams()
})

// userInput.addEventListener('input', () => searchS
userInput.addEventListener('input', () => searchStates(userInput.value));

// // userInput.addEventListener('input', () => searchS
// userInput.addEventListener('keyup', function(e){
//     if (e.key === "Enter") {
//         callParams();
//     }
// });

function createRows(items) {
    displayCountry = items.map(function (item) {
        console.log(item.region.name)
        // sortCounfirm ()
        return `
    <tr>
        <td>${
            item.region.province
        }</td>
        <td>${
            item.date
        }</td>
        <td>${
            item.confirmed
        }</td>
        <td>${
            item.deaths
        }</td>
        <td>${
            item.active
        }</td>
        <td>${
            item.fatality_rate
        }</td>
        <td>${
            item.last_update
        }</td>
    </tr>          
        `
    });
    displayCountry = displayCountry.join('');
    hideLoading();
    tableCtn.innerHTML = displayCountry;
}


function sortColumn(columnName) {
    const arrowElement = document.getElementById(columnName + "-arrow");
    sortDirection = ! sortDirection;
    arrowElement.innerHTML = sortDirection ? "&#9660" : "&#9650";

    const dataType = typeof cityData[0][columnName];
    switch (dataType) {
        case `number`: sortNumbeColumn(sortDirection, columnName);
            break
    }

    createRows(cityData);
}

function sortNumbeColumn(sort, columnName) {
    cityData = cityData.sort((a, b) => {
        return sort ? a[columnName] - b[columnName] : b[columnName] - a[columnName]


    });
}
