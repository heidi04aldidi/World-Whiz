export const getCountryByName = async (name) => {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`
    );

    if (!response.ok) {
      throw new Error("Country not found");
    }

    const data = await response.json();

    const exactMatch = data.find(
      (country) =>
        country.name.common.toLowerCase() === name.toLowerCase()
    );

    if (!exactMatch) {
      throw new Error("Exact match not found");
    }

    return {
      name: exactMatch.name.common,
      capital: exactMatch.capital?.[0] || "N/A",
      population: exactMatch.population,
      region: exactMatch.region,
      flag: exactMatch.flags?.svg || exactMatch.flags?.png,
    };
  } catch (error) {
    console.error("Error fetching country:", error);
    throw error;
  }
};