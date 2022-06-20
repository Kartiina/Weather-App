const link =" http://api.weatherstack.com/current?access_key=3e7d9873f71503db3cce590759f94fc8"

const popup = document.getElementById("popup");
const textInput = document.getElementById("text-input");
const form = document.getElementById("form");
const root = document.getElementById("root");
const close = document.getElementById("close");

let store = {
    city: "Moscow",
    temperature: 0,
    observationTime: "00:00 AM",
    description: "",
    properties: {
        feelslike: {},
        pressure: {},
        humidity: {},
        windSpeed: {},
    }
}

const fetchData = async () => {
    try {
        const query = localStorage.getItem("query") || store.city;
        const result = await fetch(`${link}&query=${query}`);
        const data = await result.json();

        const {
            current: {
            feelslike, 
            pressure, 
            humidity, 
            temperature, 
            wind_speed: windSpeed,
            observation_time: observationTime, 
            weather_descriptions: description,},
            location: {name},
        } = data;

        store = {
            ...store,
            city: name,
            temperature,
            observationTime,
            description: description[0],
            properties: {
                feelslike: {
                    title: "Feels like",
                    value: `${feelslike}°`,
                },
                pressure: {
                    title: "Pressure",
                    value: `${pressure} mm Hg`,
                },
                humidity: {
                    title: "Humidity",
                    value: `${humidity}%`,
                },
                windSpeed: {
                    title: "Wind Speed",
                    value: `${windSpeed}m/s`,
                },
            }
        }

        renderComponent();
    } catch (err){
        console.log(err);
    }
}

const getImage = (description) => {
    const value = description.toLowerCase();

    switch(value){
        case "cloud":
            return "cloud.png";
        case "sunny":
            return "sun.png";
        case "thunder":
            return "thunder.png";
        case "snow":
            return "snow.png";
        case "rain":
            return "rain&cloud.png";
        default:
            return "cloud.png";
    }
}

const renderProperties = (properties) => {
    return Object.values(properties).map(({title, value}) => {
        return `<div class="properties">
            <div class="properties__item">
                <div class="properties__name">${title}</div>
                <div class="properties__value">${value}</div>
            </div>
        </div>`;
    })
    .join("");
    
};

const getDate = () => {
    var now = new Date();
    var days =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months =["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return days[now.getDay()] + " " + now.getDate() + " " + months[now.getMonth()];
}

const markup = () => {
    const {city, description, observationTime, temperature, properties} = store;

    return `<div class="weather">
        <div class="weather__inner">
            <div class="current">
                <div class="current__city" id="city">${city}</div>
                <div class="current__time"><time>${getDate()}</time></div>
                <div class="current__icon"><img src="./images/white fluffy cloud.png" alt="cloud" width="180px" height="180px"></div>
                <div class="current__temp">${temperature}°</div>
                <div class="current__desc">${description}</div>
            </div>
            <div class="forecast">
                <div class="forecast__item">
                    <img class="forecast__icon" src="./images/${getImage(description)}" alt="" />
                    <div class="forecast__temp">${temperature}°</div>
                    <div class="forecast__time">${observationTime}</div>
                </div>
                <div class="forecast__item">
                    <img class="forecast__icon" src="./images/${getImage(description)}" alt="" />
                    <div class="forecast__temp">${temperature - Math.floor(Math.random(3)*10)}°</div>
                    <div class="forecast__time">${observationTime}</div>
                </div>
                <div class="forecast__item">
                    <img class="forecast__icon" src="./images/${getImage("Cloud")}" alt="" />
                    <div class="forecast__temp">${temperature - Math.floor(Math.random(3)*10)}°</div>
                    <div class="forecast__time">${observationTime}</div>
                </div>
                <div class="forecast__item">
                    <img class="forecast__icon" src="./images/${getImage("Cloud")}" alt="" />
                    <div class="forecast__temp">${temperature - Math.floor(Math.random(3)*10)}°</div>
                    <div class="forecast__time">${observationTime}</div>
                </div>
                <div class="forecast__item">
                    <img class="forecast__icon" src="./images/${getImage("Rain")}" alt="" />
                    <div class="forecast__temp">${temperature - Math.floor(Math.random(3)*10)}°</div>
                    <div class="forecast__time">${observationTime}</div>
                </div>
                <div class="forecast__item">
                    <img class="forecast__icon" src="./images/${getImage("Thunder")}" alt="" />
                    <div class="forecast__temp">${temperature - Math.floor(Math.random(3)*10)}°</div>
                    <div class="forecast__time">${observationTime}</div>
                </div>
            </div>
            <div id="properties">${renderProperties(properties)}</div>
        </div>
    </div>`;
}

const clickExit = (evt) => {
    popup.classList.toggle("active");
};
const exit = Array.from(document.querySelectorAll(".popup-close")).forEach(
    (element) => {
      element.addEventListener("click", clickExit);
    }
    );

const togglePopupClass = () => {
    popup.classList.toggle("active");
};

const renderComponent = () => {
    root.innerHTML = markup();

    const city = document.getElementById("city");
    city.addEventListener("click", togglePopupClass);
}

const handleInput = (e) => {
    store = {
        ...store,
        city: e.target.value,
    }
}
const handleSubmit = (e) => {
    e.preventDefault();
    const value = store.city;
    if (!value) return null;
    
    localStorage.setItem("query", value);
    fetchData();
    togglePopupClass();
}
form.addEventListener("submit", handleSubmit);
textInput.addEventListener("input", handleInput);

fetchData();