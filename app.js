window.addEventListener("load", () => {
    setBackgroundDependingOnTime();
    displayWeather();
});

function displayWeather() {
  const locale = navigator.geolocation;
  const temperatureUI = document.querySelector(".degree");
  const location = document.querySelector(".location-timezone");
  const tempDescription = document.querySelector(".temperature-description");
  const tempSymbol = document.querySelector(".temp-symbol");

  locale.getCurrentPosition((position) => {
    const long = position.coords.longitude;
    const lat = position.coords.latitude;

    const proxy = "https://cors-anywhere.herokuapp.com/";
    const api = `${proxy}https://api.darksky.net/forecast/68a045520404add53311c0447e7a3075/${lat},${long}`;

    fetch(api)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const { temperature, summary, icon } = data.currently;
        const tempC = Math.trunc(((temperature - 32) * 5) / 9);
        const tempF = Math.trunc(temperature);

        //Set DOM Elements
        temperatureUI.textContent = tempF;
        tempDescription.textContent = summary;
        location.textContent = data.timezone;
        tempSymbol.textContent = " °F";

        //Set Icons
        setIcons(icon, document.querySelector(".icon"));
        while (temperatureUI.textContent == "O") {
          temperatureUI.classList.add("loadingCircle");
        }
        temperatureUI.addEventListener("click", () => {
          toggleBetweenTempSystem(temperatureUI, tempSymbol, tempC, tempF);
        });
      })
      .catch((e) => {
        window.alert(e);
      });
  });
}

function toggleBetweenTempSystem(temperatureUI, tempSymbol, tempC, tempF) {
  if (temperatureUI.textContent == tempF) {
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
  const skycons = new Skycons({ color: "white" });
  const currentIcon = icon.replace(/-/g, "_").toUpperCase();
  skycons.play();
  return skycons.set(iconID, Skycons[currentIcon]);
}

function setBackgroundDependingOnTime() {
  main = document.querySelector("main");
  const currDate = new Date();
  const hours = currDate.getHours();
  const gradients = [
    "linear-gradient(#012459,#001322)",
    "linear-gradient(#003972, #001322)",
    "linear-gradient(#003972,#001322)",
    "linear-gradient(#004372,#00182b)",
    "linear-gradient(#004372, #011d34)",
    "linear-gradient(#016792,#00182b)",
    "linear-gradient(#07729f,#042c47)",
    "linear-gradient(#12a1c0 ,#07506e)",
    "linear-gradient(#74d4cc ,#1386a6)",
    "linear-gradient(#efeebc ,#61d0cf)",
    "linear-gradient(#fee154 ,#a3dec6)",
    "linear-gradient(#fdc352 ,#e8ed92)",
    "linear-gradient(#ffac6f ,#ffe467)",
    "linear-gradient(#fda65a ,#ffe467)",
    "linear-gradient(#fd9e58 ,#ffe467)",
    "linear-gradient(#f18448 ,#ffd364)",
    "linear-gradient(#f06b7e ,#f9a856)",
    "linear-gradient(#ca5a92 ,#f4896b)",
    "linear-gradient(#5b2c83 ,#d1628b)",
    "linear-gradient(#371a79 ,#713684)",
    "linear-gradient(#28166b ,#45217c)",
    "linear-gradient(#192861 ,#372074)",
    "linear-gradient(#040b3c ,#233072)",
    "linear-gradient(#040b3c ,#012459)",
  ];      

  //set background color to gradient corresponding to current hour
  main.style.background = gradients[hours];
}
