const api_key = `9824e5109120c16f9707e2d56a77cfe3`
const form = document.querySelector('form')
const search = document.querySelector('#search')
const weather = document.querySelector('#weather')
const col_main = document.querySelector('.col-main')
const maintag = document.querySelector('main')

const getdata = async (city) =>{
    weather.innerHTML = `<h2>please wait....</h2>`
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
    const response = await fetch(url)
    const data = await response.json()
    return showWeather(data)
}
const showWeather = (data)=>{
    if(
        data.cod == "404"
    ){
        weather.innerHTML = `<h2>city not found</h2>`
        return
    }
    maintag.style.backgroundImage =`url("https://source.unsplash.com/random/900×700/?${data.weather[0].description}")`
    weather.innerHTML = `<div> 
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather image"width="90px">
    </div>
    <div>
    <h2>${data.main.temp}c</h2>
    <h4>${data.weather[0].main}</h4>
    </div>`
    col_main.innerHTML = 
      `<div class="col">
        <div class="top-h" style = "text-align:center">
            <h4 id="heading">temperature</h4>
            <h3>${data.main.temp}c</h3>
            <p>description is ${data.weather[0].description}</p>
             <p>min temperature ${data.main.temp_min}</p>
             <p>max temperature ${data.main.temp_max}</p>
             </div>
    </div>




    <div class="col">
    <div class="top-h" style = "text-align:center">
        <h4 id="heading">humidity info</h4>
        <h3>${data.main.humidity}%</h3>
        <p>wind degree is ${data.wind.deg}</p>
         <p>feel like is ${data.main.feels_like}</p>
         <p>humidity is  ${data.main.humidity}</p>
         </div>
</div>



<div class="col">
        <div class="top-h" style = "text-align:center">
            <h4 id="heading">wind info</h4>
            <h3>${data.wind.speed}km/hr</h3>
            <p>wind speed is ${data.wind.speed}</p>
             <p>sunrise time ${data.sys.sunrise}</p>
             <p>sunset time ${data.sys.sunset}</p>
             </div>
    </div>`
    form.reset()

}
form.addEventListener("submit" , (event)=>{
    event.preventDefault()
    getdata(search.value)
})