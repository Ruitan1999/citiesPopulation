
const tableCtn = document.querySelector('.trtr');
const userInput = document.querySelector('input');
const btn = document.querySelector('button');


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '230234f211msh8dd6d8c2374c270p164240jsnad194c9e1b6a',
		'X-RapidAPI-Host': 'covid-19-statistics.p.rapidapi.com'
	}
};


let params = ''

const callParams = () => {
    params = userInput.value
    


fetch(`https://covid-19-statistics.p.rapidapi.com/reports?iso=${params}`, options)
.then(response => response.json())
.then(function diplayItems (items) {
    let tableData = "";

    let displayCountry = items.data.map(function(item){
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
    tableCtn.innerHTML = displayCountry;
})
.catch(err => console.error(err));
    userInput.value = '';
}


btn.addEventListener('click', callParams)
