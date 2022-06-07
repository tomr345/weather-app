async function getData(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=f8292567916d70402fec5bd917e08fd9`,
    {mode: 'cors'});
    const response2 = await response.json();
    //log result
    console.log(response2);
    return response2;
}

async function populateFields(searchTerm) {
    const cityHeader = document.querySelector('.city');
    const city = await getData(searchTerm);
    cityHeader.innerHTML = city.name;

    const tempHeader = document.querySelector('.temperature');
    tempHeader.innerHTML = `${convertTemp(city.main.temp)}\u00B0c`;

    const descriptionHeader = document.querySelector('.description');
    descriptionHeader.innerHTML = city.weather[0].description;

    const img = document.querySelector('img');
    const icon = city.weather[0].icon;
    img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

}

function convertTemp(kelvin) {
    return (kelvin - 273.15).toFixed(2);
}

function searchCity() {
    const input = document.getElementById('search').value;
    populateFields(input);
}

populateFields("cheltenham");
const button = document.querySelector('#submit').addEventListener('click', searchCity);
