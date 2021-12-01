window.addEventListener('load', () => {
    if(navigator.geolocation) {
        getWeather();
    }
});

function getWeather() {
    const temperatureUI = document.querySelector(".degree");
    const location = document.querySelector(".location-timezone");
    const tempDescription = document.querySelector(".temperature-description");
    const tempSymbol = document.querySelector(".temp-symbol");
    
    navigator.geolocation.getCurrentPosition(position => {
        const long = position.coords.longitude;
        const lat =  position.coords.latitude;

        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const api = `${proxy}https://api.darksky.net/forecast/68a045520404add53311c0447e7a3075/${lat},${long}`;

        fetch(api).then(response => {
                return response.json();
            })
            .then(data => {
                const { temperature, summary, icon} = data.currently;
                const tempC = Math.trunc((temperature - 32) * 5 / 9);
                const tempF = Math.trunc(temperature);
                
                //Set DOM Elements
                temperatureUI.textContent = tempF;
                tempDescription.textContent = summary;
                location.textContent = data.timezone;
                tempSymbol.textContent = " °F";

                //Set Icons
                setIcons(icon, document.querySelector(".icon"));
                if(temperatureUI.textContent == 'O') {
                    temperatureUI.classList.add("loadingCircle");
                }
                temperatureUI.addEventListener('click', () => {
                    toggleBetweenTempSystem(temperatureUI, tempSymbol, tempC, tempF);
                });
            })
            .catch(e => {
                window.alert(e);
            });
    });
}

function toggleBetweenTempSystem(temperatureUI, tempSymbol, tempC, tempF) {
    if(temperatureUI.textContent == tempF) {
        temperatureUI.textContent = tempC;
        tempSymbol.textContent = " °C";
        return;
    } else {
        temperatureUI.textContent = tempF;
        tempSymbol.textContent = " °F";
        return;
    }
}   

function setIcons(icon, iconID) {
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
}