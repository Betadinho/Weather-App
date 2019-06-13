window.addEventListener('load', () => {
    let long;
    let lat;
    let tempDegree = document.querySelector(".degree");
    let location = document.querySelector(".location-timezone");
    let tempDescription = document.querySelector(".temperature-description");
    let tempSymbol = document.querySelector(".temp-symbol");

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(positopn => {
            long = positopn.coords.longitude;
            lat =  positopn.coords.latitude;
            
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/68a045520404add53311c0447e7a3075/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temperature, summary, icon} = data.currently;
                    const tempC = Math.trunc((temperature - 32) * 5 / 9);
                    const tempF = Math.trunc(temperature);
                    
                    
                    //Set DOM Elements
                    tempDegree.textContent = tempF;
                    tempDescription.textContent = summary;
                    location.textContent = data.timezone;
                    tempSymbol.textContent = " °F";

                    //Set Icons
                    setIcons(icon, document.querySelector(".icon"));
                    if(tempDegree.textContent == 'O') {
                        tempDegree.classList.add("loadingCircle");
                    }
                    tempDegree.addEventListener('click', () => {
                        if(tempDegree.textContent == tempF) {
                            tempDegree.textContent = tempC;
                            tempSymbol.textContent = " °C";

                        } else if (tempDegree.textContent == tempC) {
                            tempDegree.textContent = tempF;
                            tempSymbol.textContent = " °F";
                        }
                    });
                
                });
        });


    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);

    }

});