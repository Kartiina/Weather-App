const link =" http://api.weatherstack.com/current?access_key=3e7d9873f71503db3cce590759f94fc8"

const popup = document.getElementById("popup");
// const textInput = document.getElementById("text-input");
// const form = document.getElementById("form");
const root = document.getElementById("root");

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
    const result = await fetch(`${link}&query=${store.city}`);
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

console.log(data);

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
// return `<div class="details">
//     <div class="details__row">
//         <div class="details__item feelslike">
//             <div class="details__name">Feels like</div>
//             <div class="details__value">${feelslike}</div>
//         </div>
//         <div class="details__item pressure">
//             <div class="details__name">Pressure</div>
//             <div class="details__value">${pressure}</div>
//         </div>
//     </div>
//     <div class="details__row">
//         <div class="details__item humidity">
//             <div class="details__name">Humidity</div>
//             <div class="details__value">${humidity}</div>
//         </div>
//         <div class="details__item wind">
//             <div class="details__name">Wind</div>
//             <div class="details__value">${wind_speed}</div>
//         </div>
//     </div>
// </div>`;
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
                    <div class="forecast__temp">${temperature}°</div>
                    <div class="forecast__time">${observationTime}</div>
                </div>
                <div class="forecast__item">
                    <img class="forecast__icon" src="./images/${getImage("Cloud")}" alt="" />
                    <div class="forecast__temp">${temperature}°</div>
                    <div class="forecast__time">${observationTime}</div>
                </div>
                <div class="forecast__item">
                    <img class="forecast__icon" src="./images/${getImage("Cloud")}" alt="" />
                    <div class="forecast__temp">${temperature}°</div>
                    <div class="forecast__time">${observationTime}</div>
                </div>
                <div class="forecast__item">
                    <img class="forecast__icon" src="./images/${getImage("Rain")}" alt="" />
                    <div class="forecast__temp">${temperature}°</div>
                    <div class="forecast__time">${observationTime}</div>
                </div>
                <div class="forecast__item">
                    <img class="forecast__icon" src="./images/${getImage("Thunder")}" alt="" />
                    <div class="forecast__temp">${temperature}°</div>
                    <div class="forecast__time">${observationTime}</div>
                </div>
            </div>
            <div id="properties">${renderProperties(properties)}</div>
        </div>
    </div>`;
}
const togglePopupClass = () => {
    popup.classList.toggle("active");
};

const renderComponent = () => {
    root.innerHTML = markup();

    const city = document.getElementById("city");
    city.addEventListener("click", togglePopupClass);
}

// form.addEventListener("submit", handleSubmit);
// textInput.addEventListener("input", handleInput);

fetchData();