export const citiesFromOffersAdapter = (offers) => {
  const cities = new Map();
  for (const {city} of offers) {
    if (!cities.has(city.name)) {
      cities.set(city.name, {
        id: cities.size + 1,
        name: city.name,
        coordinates: [city.location.latitude, city.location.longitude],
        zoom: city.location.zoom
      });
    }
  }
  return Array.from(cities.values());
};
