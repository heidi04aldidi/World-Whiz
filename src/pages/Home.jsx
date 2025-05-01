import { useState } from "react";
import { getCountryByName } from "../api/restCountries";
import CountryInfo from "../components/CountryInfo";
import "./Home.css";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setLoading(true);
    setError("");
    try {
      const countryData = await getCountryByName(searchTerm);
      setSelectedCountry(countryData);
    } catch (err) {
      console.error(err);
      setError("❌ Country not found. Please try again.");
      setSelectedCountry(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <h1 className="typewriter-title">
        <span className="typewriter-text"> 🌍 World Whiz</span>
      </h1>

      <div className="home-content fade-in-delay">
        <form onSubmit={handleSearch} className="search-wrapper">
          <input
            type="text"
            placeholder="Search for a country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Country name"
          />
          <span className="search-icon">🔍</span>
        </form>

        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}

        {selectedCountry && (
          <div className="result-container">
            <CountryInfo country={selectedCountry} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;