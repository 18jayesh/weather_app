let inp = document.getElementById("city").value

window.onload = function () {
    fdata() 
}



async function fdata() {
    let res1 = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=21.1702&longitude=72.8311&current=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,relative_humidity_2m_max&forecast_days=7`);

    let result1 = await res1.json()
    let data1 = result1 
    console.log(data1)

    document.getElementById("main-card").innerHTML = `
        <h2>Surat</h2>
        <div class="temp">${data1.current.temperature_2m}<span>°C</span></div>
        <p>💨 Wind: ${data1.current.wind_speed_10m} km/h</p>
        <p>💧 Humidity: ${data1.current.relative_humidity_2m}%</p>
    `
}

function toggleMode(){
    document.body.classList.toggle("dark");
}

async function weather() {
    let inp = document.getElementById("city").value
    console.log(inp)

    let res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${inp}`)
    let result = await res.json()
    let data = result
    console.log(data)
    
    if (!result.results || result.results.length === 0) {
        alert("Enter the valid city name ")
        return
    }
   

    let lat = data.results[0].latitude;
    let lon = data.results[0].longitude;

    console.log(lat)
    console.log(lon)

    let res1 = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,relative_humidity_2m_max&forecast_days=7`);

    let result1 = await res1.json()
    let data1 = result1 
    console.log(data1)

    document.getElementById("main-card").innerHTML = `
        <h2>${inp}</h2>
        <div class="temp">${data1.current.temperature_2m}<span>°C</span></div>
        <p>💨 Wind: ${data1.current.wind_speed_10m} km/h</p>
        <p>💧 Humidity: ${data1.current.relative_humidity_2m}%</p>
    `
    upcdays(data1)
}
async function upcdays(data) {
    let day = data.daily
    let con = " "

    for(let i=0; i<7; i++){
       con += `
            <div class="container">
                <b>Day ${i+1}</b>
                <p>Max: ${day.temperature_2m_max[i]}°C</p>
                <p>Min: ${day.temperature_2m_min[i]}°C</p>
                <p>Rain: ${day.precipitation_sum[i]} mm</p>
            </div>
        `
    }
    document.getElementById("result").innerHTML = con;

}