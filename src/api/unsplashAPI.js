const UNSPLASH_ACCESS_KEY = "vsMSUkozQQbujy6orPWUhB9wXNAGpo94EOWo7465g2c";

export const getCountryImages = async (countryName) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        countryName
      )}&per_page=6&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Unsplash API Error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      console.warn(`No images found for: ${countryName}`);
      return [];
    }

    return data.results.map((img) => ({
      id: img.id,
      url: img.urls.small,
      alt: img.alt_description || `${countryName} scenery`,
    }));
  } catch (error) {
    console.error("Error fetching Unsplash images:", error);
    return [];
  }
};