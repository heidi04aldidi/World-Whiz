import { useEffect, useState } from "react";
import { getWeatherByCity } from "../api/weatherAPI";
import { getCountryImages } from "../api/unsplashAPI";
import "./CountryInfo.css";

const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (!country) return;

    let isMounted = true;
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const [weatherData, imageData] = await Promise.all([
          getWeatherByCity(country.capital),
          getCountryImages(country.name),
        ]);
        if (isMounted) {
          setWeather(weatherData);
          setImages(imageData);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError("Error fetching data.");
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [country]);

  if (!country) return null;
  if (loading) return <p className="loading">Loading country info...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="country-info-container">
      <div
        className={`flip-card ${flipped ? "flipped" : ""}`}
        onClick={() => setFlipped(!flipped)}
      >
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <h2 className="country-name">{country.name}</h2>
            <img
              src={country.flag}
              alt={`${country.name} flag`}
              className="country-flag"
            />
            <p>
              <strong>Capital:</strong> {country.capital}
            </p>
            <p>
              <strong>Population:</strong> {country.population.toLocaleString()}
            </p>
            <p>
              <strong>Region:</strong> {country.region}
            </p>
            {weather && (
              <div className="weather-info">
                <h3>🌡️ Weather in {country.capital}:</h3>
                <p>Temperature: {weather.temp}°C</p>
                <p>Condition: {weather.description}</p>
              </div>
            )}
            <p className="flip-hint">Click to see glimpses ⤵️</p>
          </div>

          <div className="flip-card-back">
            <h3 className="glimpses-title">📸 Glimpses of {country.name}</h3>
            <div className="glimpses-gallery">
              {images.map((img) => (
                <img
                  key={img.id}
                  src={img.url}
                  alt={img.alt}
                  className="glimpse-img"
                />
              ))}
            </div>
            <p className="flip-hint">Click to go back ⤴️</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryInfo;