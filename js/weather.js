const link =" http://api.weatherstack.com/current?access_key=cb53f3e22a63af8f5601b63f3e35f075"

let store = {
    city: "Moscow",
    feelslike: 0,
    pressure: 0,
    humidity: 0,
    windSpeed: 0,
    observationTime: "00:00 AM",
    description: ""
}

const fetchData = async () => {
    const result = await fetch(`${link}&query=${store.city}`);
    const data = await result.json();

    const {
        current: {feelslike, pressure, humidity, wind_speed: windSpeed, observation_time: observationTime, weather_description: description}
    } = data;

    store = {
        ...store,
        feelslike,
        pressure,
        humidity,
        windSpeed,
        observationTime,
        description: description[0]
    }


    console.log("name:", name)
    console.log(2, cloudcover)
    console.log(data)
}


fetchData();