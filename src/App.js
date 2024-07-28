import { Fragment, useEffect, useState } from "react";
import Location from "./components/Location";
import "./App.css";
import Input from "./components/Input";
function App() {
  const [isCelcius, setIsCelcius] = useState(true);
  const [coords, setCoords] = useState('')

  let initialData = {};
  const [weatherData, setWeatherData] = useState(initialData);
  function success(pos) {
    var crd = pos.coords;
    const lat = crd.latitude;
    const lon = crd.longitude;
    // console.log(lat + ',' + lon)
    const latAndLon = lat + ',' + lon;
    setCoords(latAndLon);
  }
  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
    
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          console.log(result);
          if (result.state === "granted") {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "prompt") {
            //If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
            console.log("denied")
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    console.log(coords)
    async function fetchInitialData(q) {
      const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${q}`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "c861f2f2f8mshf2e3969478b443cp1ee1dfjsneb5a026a3dd0",
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();

        const {
          location: { name, country },
          current: {
            temp_c,
            temp_f,
            condition: { text, icon },
          },
        } = result;
        initialData = {
          cityName: name,
          countryName: country,
          tempInC: temp_c,
          tempInF: temp_f,
          conditionText: text,
          conditionIcon: icon,
        };
        setWeatherData(initialData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchInitialData(coords);
  }, []);

  const fetchWeather = async (q) => {
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${q}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "c861f2f2f8mshf2e3969478b443cp1ee1dfjsneb5a026a3dd0",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const {
        location: { name, country },
        current: {
          temp_c,
          temp_f,
          condition: { text, icon },
        },
      } = result;
      initialData = {
        cityName: name,
        countryName: country,
        tempInC: temp_c,
        tempInF: temp_f,
        conditionText: text,
        conditionIcon: icon,
      };
      setWeatherData(initialData);
    } catch (error) {
      console.error(error);
    }
  };

  const setCelciusTemp = () => {
    setIsCelcius(true);
  };

  const setFarenheitTemp = () => {
    setIsCelcius(false);
  };

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(success, errors, options);
    fetchWeather(coords);
    console.log(coords)
  }

  return (
    <Fragment>
      <main>
        <Input
          fetchWeather={fetchWeather}
          setCelciusTemp={setCelciusTemp}
          setFarenheitTemp={setFarenheitTemp}
          getUserLocation={getUserLocation}
        />
        <Location weatherData={weatherData} isCelcius={isCelcius} />
      </main>
    </Fragment>
  );
}

export default App;
