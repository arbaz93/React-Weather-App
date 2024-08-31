import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { TimeOption } from './TimeOption';

function App() {
  const [userLocation, setUserLocation] = useState({});
  const [weather, setWeather] = useState({});
  const [sortedWheather, setSortedWheather] = useState();
  const [selectedWeather, setSelectedWeather] = useState();
  const [farenheit, setFarenheit] = useState(true);
  const [defaultWheather, setdefaultWheather] = useState(0);
  const [mood, setMood] = useState("Please wait");
  const [location, setLocation] = useState("Please wait");
  function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserLocation(position)
        },
        error => {
          console.log(error)
        })
    }
  }
  async function getWeather(position, time) {
    position;
    if (position != {}) {
      const x = position.coords.latitude;
      const y = position.coords.longitude;
      const req = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=e7fbf64782374509b8634932242708&q=${x},${y}&days=${time}`)
      const res = await req.json();
      setWeather(res);

      let date = new Date(`${res.forecast.forecastday[0].date}`);
      return;
    }
  }
  const getDayName = (date, locale) => {
    return date.toLocaleDateString(locale, { weekday: 'short' })
  }
  const getDate = (dt) => {
    const d = new Date(dt);
    const year = d.getFullYear();
    const month = d.getMonth();
    const date = d.getDate();
    return `${year}-0${month + 1}-${date - 2}`
  }
  function addClass(cName, elem, removeClassElem) {
    document.querySelectorAll(`.${removeClassElem}`).forEach(e => e.classList.remove(cName))
    elem.classList.add(cName)
  }
  function sortWeatherByHour(obj) {
    setSortedWheather(undefined)

    let hourlyData = {
      date: obj.location.localtime,
      location: obj.location.name,
      weather_data: []
    };
    obj.forecast.forecastday[0].hour.map((elem, i) => {
      let d = {
        id: crypto.randomUUID(),
        time: new Date(elem.time).getHours() + 1,
        temp_c: elem.temp_c,
        temp_f: elem.temp_f,
        condition: elem.condition.text,
        image: getMoodImage(elem.condition.text) 
      }
      hourlyData.weather_data.push(d)
    })
    setSortedWheather(hourlyData);

    return hourlyData;

  }
  async function sortWeatherByWeak(position) {
    setSortedWheather(undefined)
    const x = position.coords.latitude;
    const y = position.coords.longitude;
    const req = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=e7fbf64782374509b8634932242708&q=${x},${y}&days=7`);
    const res = await req.json();
    setWeather(res);
    let weeklyData = {
      date: res.location.localtime,
      location: res.location.name,
      weather_data: []
    };
    res.forecast.forecastday.map((elem, i) => {
      let d = {
        id: crypto.randomUUID(),
        day: getDayName(new Date(elem.date)),
        temp_c: elem.day.avgtemp_c,
        temp_f: elem.day.avgtemp_f,
        condition: elem.day.condition.text,
        image: getMoodImage(elem.day.condition.text)
      }
      weeklyData.weather_data.push(d)
    })
    setSortedWheather(weeklyData);

    return weeklyData;

  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setUserLocation(position)
        const x = position.coords.latitude;
        const y = position.coords.longitude;
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=e7fbf64782374509b8634932242708&q=${x},${y}&days=${1}`)
          .then(r => r.json())
          .then(r => {
            setWeather(r);
            setdefaultWheather(r.current.temp_f);
            sortWeatherByHour(r);
            setLocation(r.location.name)
            setMood(r.current.condition.text)

          })
      })
  }, [])

  function getId(elem, key ) {
    let data = sortedWheather.weather_data.filter(el => el.id === key);
    addClass("active", elem.currentTarget, "time");
    setSelectedWeather(data)
    setMood(data[0].condition)
  }
  function changeTemp() {
    setFarenheit(!farenheit);
  }
  function getMoodImage(text) {
    let conditions = [
      {
        "day": "Sunny",
        "image": "sunny.svg"
      },
      {
        "day": "Partly cloudy",
        "image": "sunny cloudy.svg"
      },
      {
        "day": "Cloudy",
        "image": "cloudy.svg"
      },
      {
        "day": "Overcast",
        "image": "double cloudy.svg"
      },
      {
        "day": "Mist",
        "image": "double cloudy.svg"
      },
      {
        "day": "Patchy rain possible",
        "image": "dribbling.svg"
      },
      {
        "day": "Patchy rain nearby",
        "image": "dribbling.svg"
      },
      {
        "day": "Patchy snow possible",
        "image": "dribbling.svg"
      },
      {
        "day": "Patchy sleet possible",
        "image": "snowing.svg"
      },
      {
        "day": "Patchy freezing drizzle possible",
        "image": "snowing.svg"
      },
      {
        "day": "Thundery outbreaks possible",
        "image": "thunder.svg"
      },
      {
        "day": "Blowing snow",
        "image": "snowing.svg"
      },
      {
        "day": "Blizzard",
        "image": "snowing.svg"
      },
      {
        "day": "Fog",
        "image": "double cloudy.svg"
      },
      {
        "day": "Freezing fog",
        "image": "double cloudy.svg"
      },
      {
        "day": "Patchy light drizzle",
        "image": "dribbling.svg"
      },
      {
        "day": "Light drizzle",
        "image": "dribbling.svg"
      },
      {
        "day": "Freezing drizzle",
        "image": "dribbling.svg"
      },
      {
        "day": "Heavy freezing drizzle",
        "image": "raining.svg"
      },
      {
        "day": "Patchy light rain",
        "image": "raining.svg"
      },
      {
        "day": "Light rain",
        "image": "raining.svg"
      },
      {
        "day": "Moderate rain at times",
        "image": "raining.svg"
      },
      {
        "day": "Moderate rain",
        "image": "raining.svg"
      },
      {
        "day": "Heavy rain at times",
        "image": "raining.svg"
      },
      {
        "day": "Heavy rain",
        "image": "raining.svg"
      },
      {
        "day": "Light freezing rain",
        "image": "raining.svg"
      },
      {
        "day": "Moderate or heavy freezing rain",
        "image": "raining.svg"
      },
      {
        "day": "Light sleet",
        "image": "raining.svg"
      },
      {
        "day": "Moderate or heavy sleet",
        "image": "raining.svg"
      },
      {
        "day": "Patchy light snow",
        "image": "snowing.svg"
      },
      {
        "day": "Light snow",
        "image": "snowing.svg"
      },
      {
        "day": "Patchy moderate snow",
        "image": "snowing.svg"
      },
      {
        "day": "Moderate snow",
        "image": "snowing.svg"
      },
      {
        "day": "Patchy heavy snow",
        "image": "snowing.svg"
      },
      {
        "day": "Heavy snow",
        "image": "snowing.svg"
      },
      {
        "day": "Ice pellets",
        "image": "snowing.svg"
      },
      {
        "day": "Light rain shower",
        "image": "raining.svg"
      },
      {
        "day": "Moderate or heavy rain shower",
        "image": "raining.svg"
      },
      {
        "day": "Torrential rain shower",
        "image": "raining.svg"
      },
      {
        "day": "Light sleet showers",
        "image": "raining.svg"
      },
      {
        "day": "Moderate or heavy sleet showers",
        "image": "raining.svg"
      },
      {
        "day": "Light snow showers",
        "image": "raining.svg"
      },
      {
        "day": "Moderate or heavy snow showers",
        "image": "snowing.svg"
      },
      {
        "day": "Light showers of ice pellets",
        "image": "snowing.svg"
      },
      {
        "day": "Moderate or heavy showers of ice pellets",
        "image": "snowing.svg"
      },
      {
        "day": "Patchy light rain with thunder",
        "image": "raining.svg"
      },
      {
        "day": "Moderate or heavy rain with thunder",
        "image": "thunder.svg"
      },
      {
        "day": "Patchy light snow with thunder",
        "image": "snowing.svg"
      },
      {
        "day": "Moderate or heavy snow with thunder",
        "image": "snowing.svg"
      }
    ]
    if(conditions.findIndex(el => el.day.toLowerCase() == text.toLowerCase()) == -1) return "src/assets/cloudy.svg"
    let y = conditions.find(elem => {
      return elem.day.toLowerCase() == text.toLowerCase()
    })
    let image = `src/assets/${y.image}`;
    return image

  }

  function changeBg() {
    const date = new Date();
    let time = date.getHours();

    
    
    if(time > 5 && time < 17) {
      document.querySelector(':root').style.setProperty('--bgchange-clr', 'rgb(0,0,0)');
    } else {
      document.querySelector(':root').style.setProperty('--bgchange-clr', 'rgba(251, 255, 60, 1)')
    }
  }
  changeBg()
  return (
    <>
      <div className="bg-image"></div>
      <div className="bg-blur"></div>

      <section onClick={() => changeBg()} className='feel-and-location'>
        <p className="feel">{mood}</p>
        <button className='location-name prevent-select'>{location}</button>
      </section>
      <div className="wc">
        <section className='temprature'>
          <p  className="temp" onClick={() => {changeTemp()}}>{(selectedWeather != undefined) ? ((farenheit == true) ? selectedWeather[0].temp_f: selectedWeather[0].temp_c) : defaultWheather}<small className='temp-degree'>{(farenheit == true) ? "0F": "0C"}</small></p>
        </section>
        <section className="wheather-options-container">
          <div className="wheather-cat prevent-select">
            <button className='hour opt active-option' onClick={(e) => { sortWeatherByHour(weather); addClass("active-option", e.currentTarget, "opt") }}>H</button>
            <button className='week opt' onClick={(e) => { sortWeatherByWeak(userLocation); addClass("active-option", e.currentTarget, "opt") }}>W</button>
          </div>
          <div className="wheather-time" id='drag-container'>



            {(sortedWheather != undefined) ? sortedWheather.weather_data.map((data) => { return <TimeOption key={data.id} data={data} addClass={addClass} getId={getId} /> }) : "loading..."}

          </div>
        </section>
      </div>
    </>
  )
}

export default App
