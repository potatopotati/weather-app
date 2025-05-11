const weatherInfo = document.querySelector('.temp')
const XY = document.querySelector('.coordinates')
let latitude=0
let longitude = 0
const apiKey = config.WEATHER_API_KEY;
const requestOptions = {
    method: 'GET',
    headers: {
        accept: 'application/json', 
        'accept-encoding': 'deflate, gzip, br'
    }
}

window.addEventListener('load',()=>{
    getLocation();
})

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success,error);
    }
    else{
        alert("Geolocation not supported by this browser!")
    }
}

//callback function
function success(coordinates){
    latitude=coordinates.coords.latitude
    longitude = coordinates.coords.longitude
    XY.textContent= `Latitude: ${latitude}, Longitude: ${longitude}`
    const apiUrl = `https://api.tomorrow.io/v4/weather/forecast?location=${latitude},${longitude}&apikey=${apiKey}`
    fetch(apiUrl,requestOptions)
    .then(response=>{
        if(!response.ok){
            throw new Error(response.status)
        }
        return response.json()
    })
    .then(data=>{
        const temperature = data.timelines.hourly[0].values.temperature
        weatherInfo.textContent = temperature + '°C';
    })
    .catch(error=>{
        console.log('Error:',error)
    })
}

function error(){
    alert("Sorry, failed to retrieve geolocation")
}