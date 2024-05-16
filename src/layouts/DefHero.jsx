import React, { useEffect, useRef, useState } from "react";
import image3 from "../images/photo-1562043236-559c3b65a6e2.avif";
import { Skeleton, GridSkeleton } from "./Skeleton";
import { motion } from "framer-motion";
import axios from "axios";
import debounce from "lodash.debounce";
import GridLeftS from "./GridLeftS";
import Dropdown from "./Dropdown";
import WeatherData from "./WeatherData";
import Forecast from "./Forecast";
import Popup from "./Popup";
export default function Hero() {
  //Animations or interactions
  const [dropdown, setDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  //Input ref
  const ref = useRef(null);
  //Store previous dInput
  const prevNameRef = useRef(null);
  //Storing debounced data
  const [dData, setDebData] = useState([]);
  //Storing weather data
  const [data, setData] = useState([]);
  //Storing forecast data
  const [fData, setForData] = useState([]);
  //Slice the data
  const [expanded, setExpanded] = useState(false);
  const [visibleData, setVData] = useState(3);
  //Show popup
  const [popup, setPopup] = useState(false);
  const [selectedForecast, setSelectedForecast] = useState(null);
  //Storing last  city inspections of user as history
  const [history, setHistory] = useState([]);
  const [storedCities, setStoredCities] = useState([]);
  //API Key
  const apiKey = "35acdd52d6b14df6aeb15344240405";

  //is first time for forecast data
  const [first, setFirst] = useState(true);

  //Searching city name and retrieving suggestions as a dropdown menu list
  useEffect(() => {
    setLoading(true);
    const delayedUpdate = debounce(() => {
      const inputValue = ref.current.value.trim();
      if (inputValue === "") {
        setLoading(false);
        return;
      }
      try {
        axios
          .get(
            `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${inputValue}`
          )
          .then((data) => {
            setLoading(false);
            setDebData(data.data);
          });
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }, 500);

    ref.current.addEventListener("input", delayedUpdate);

    return () => {
      ref.current.removeEventListener("input", delayedUpdate);
      delayedUpdate.cancel();
    };
  }, []);
  //************************************************************ */

  //Searching city name and retrieving weather information
  function handleSearch(name) {
    setLoading(true);
    if (name === prevNameRef.current) {
      setLoading(false);
      return;
    }

    try {
      if (!first) {
        fetchWeatherData(name);
      }

      prevNameRef.current = name;
      axios
        .get(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${name}&aqi=yes`
        )
        .then((data) => {
          setTimeout(() => {
            setLoading(false);
            setData(data.data);
            setFirst(false);
            setVData(3);
            if (!first) {
              setHistory((prevHistory) => {
                const newHistory = [
                  name,
                  ...prevHistory.filter((item) => item !== name),
                ];
                const final = newHistory.slice(0, 10);
                localStorage.setItem("searchHistory", JSON.stringify(final));
                return final;
              });
            }
          }, 1500);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  //Empty the city history
  let emptyStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  // Retrieve stored cities from local storage
  useEffect(() => {
    const storedCitiesString = localStorage.getItem("searchHistory");
    if (storedCitiesString) {
      setStoredCities(JSON.parse(storedCitiesString));
    }
  }, []);

  //Forecast Data for 12 days

  const fetchWeatherData = async (name) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${name}&days=12&aqi=no&alerts=no`
      );
      if (!response.data) {
        throw new Error("No data received");
      }
      setForData(response.data.forecast.forecastday);
      setExpanded(false);
    } catch (error) {
      throw new Error("Error fetching data");
    }
  };

  useEffect(() => {
    handleSearch("Paris");
  }, []);

  //***********************************************************************************/

  //LOADING ANIMATION
  function animateLoading() {
    setVData(visibleData + 3);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setExpanded(true);
    }, 1000);
  }

  //Forecast data
  const weatherData = [
    { text: "Feels like", prop: data.current?.feelslike_c + " °C" },
    { text: "Current temperature", prop: data.current?.temp_c + " °C" },
  ];
  const weatherHumidity = [
    { text: "Humidity", prop: data.current?.humidity + " %" },
    { text: "Visibility", prop: data.current?.vis_km + " km" },
    { text: "Wind direction", prop: data.current?.wind_dir },
  ];

  const usPaindex = data.current?.air_quality?.["us-epa-index"];
  const gbDefraindex = data.current?.air_quality?.["gb-defra-index"];

  const weatherQuality = [
    { text: "AQI", prop: null },
    { text: "CO", prop: data.current?.air_quality?.co + " %" },
    { text: "NO2", prop: data.current?.air_quality?.no2 + " %" },
    { text: "O3", prop: data.current?.air_quality?.o3 + " %" },
    { text: "US EPA Index", prop: usPaindex + " %" },
    { text: "GB Defra Index", prop: gbDefraindex + " %" },
  ];

  function showPopup(forecastData) {
    setSelectedForecast(forecastData);
    setPopup(true);
  }

  function hidePopup() {
    setPopup(false);
    setSelectedForecast(null);
  }

  const animationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <div className="relative bg-transparent flex items-center h-[440px] w-full">
        <img
          src={image3}
          alt="heroImg"
          className="z-0 p-0  w-full h-full object-top object-cover bg-center shadow-sm shadow-blue-300/20 "
        />

        <div className="absolute inset-0 p-2 gap-0 sm:gap-10 grid grid-cols-2 items-start md:items-center justify-center md:justify-between sm:p-10">
          {/* Grid left section */}
          {loading ? (
            <GridSkeleton />
          ) : (
            <GridLeftS
              locName={data.location?.name}
              locCountry={data.location?.country}
              conditionIcon={data.current?.condition?.icon}
              conditionText={data.current?.condition?.text}
            />
          )}
          {/* Grid right section */}
          <div className="flex h-full w-full flex-col items-center">
            <input
              type="text"
              placeholder="Search for a city.."
              className="bg-transparent font-Raleway text-white border-gray-600 max-w-full md:w-[440px] px-3 py-1 border focus:border-white rounded-lg shadow-sm hover:shadow-md outline-none  placeholder-gray-600  text-[10px] sm:text-xs md:text-lg duration-300 ease-in-out"
              ref={ref}
            />
            {dData.length > 0 ? (
              <div
                onClick={() => setDropdown(!dropdown)}
                className="min-w-[20%] w-fit mt-1 cursor-pointer hover:bg-white/40 active:bg-white/50 border border-gray-600 active:border-white/50 text-center sm:rounded-lg rounded-full bg-transparent py-1 text-white flex items-center justify-center">
                <span style={{ fontSize: "0.4rem" }}>&#9660;</span>
              </div>
            ) : (
              ""
            )}

            <div className=" font-Raleway grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-1 rounded-xl sm:p-1 bg-transparent">
              {dropdown
                ? dData.map((item, index) => (
                    <div
                      onClick={() => {
                        handleSearch(item.name);
                      }}
                      key={index}>
                      <Dropdown
                        icountry={item.country}
                        iname={item.name}
                        iregion={item.region}
                      />
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center text-center items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-400 ">
          Today's weather {fData.length > 0 ? "and Forecast data" : ""}
        </h1>
        <div className="flex flex-col sm:flex-row flex-grow-1 w-full items-center text-start my-2">
          <h1 className="text-gray-400 text-lg sm:text-xl font-bold">
            Recently searched cities:{" "}
          </h1>
          <div className="flex flex-wrap gap-2">
            {history.length > 0
              ? history.map((city, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(city)}
                    className="bg-gray-200 hover:shadow-md hover:bg-gray-300 text-[#3a86ff] mx-1 px-3 py-1 rounded-md cursor-pointer duration-300">
                    {city}
                  </button>
                ))
              : storedCities.map((city, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(city)}
                    className="bg-gray-200 hover:shadow-md hover:bg-gray-300 text-[#3a86ff] mx-1 px-3 py-1 rounded-md cursor-pointer duration-300">
                    {city}
                  </button>
                ))}
            {history.length !== 0 || storedCities.length !== 0 ? (
              <button
                className="border text-red-500 bg-red-200 border-red-300 hover:border-red-600 hover:text-red-600 hover:bg-red-300 active:bg-red-100 px-2 py-1 rounded-lg duration-300"
                onClick={emptyStorage}>
                Clear history
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-3 m-auto gap-4">
          {loading ? (
            Array.from({ length: fData.length > 0 ? 5 : 2 }).map((_, index) => (
              <Skeleton key={index} />
            ))
          ) : (
            <>
              <WeatherData data={weatherData} grid_layout={"1"} />
              <WeatherData data={weatherHumidity} grid_layout={"1"} />
              <WeatherData data={weatherQuality} grid_layout={"2"} />
            </>
          )}
          {loading ? (
            <Skeleton />
          ) : (
            <>
              {fData.slice(0, 3).map((data, index) => (
                <motion.div
                  key={index}
                  onClick={() => showPopup(data)}
                  initial="hidden"
                  animate="visible"
                  variants={animationVariants}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: index * 0.2,
                  }}>
                  <Forecast data={data} index={index} />
                </motion.div>
              ))}
              {expanded &&
                fData.slice(3, visibleData).map((data, index) => (
                  <motion.div
                    key={index + 3}
                    onClick={() => showPopup(data)}
                    initial="hidden"
                    animate="visible"
                    variants={animationVariants}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                      delay: (index + 3) * 0.2,
                    }}>
                    <Forecast data={data} index={index} />
                  </motion.div>
                ))}
            </>
          )}
        </div>
        {visibleData < fData.length && !loading && (
          <button
            className="text-[#3a86ff] block px-2 rounded-sm border border-transparent hover:border-blue-600 w-fit mx-auto my-4"
            onClick={() => animateLoading()}>
            Load More
          </button>
        )}
        {popup && selectedForecast && (
          <Popup data={selectedForecast} onClose={() => hidePopup()} />
        )}
      </div>
    </>
  );
}
