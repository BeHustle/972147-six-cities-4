export const offerAdapter = (offer, cities) => ({
  id: offer.id,
  name: offer.title,
  price: offer.price,
  image: offer.preview_image,
  images: offer.images,
  type: offer.type,
  isPremium: offer.is_premium,
  inBookmarks: offer.is_favorite,
  rating: offer.rating,
  rooms: `${offer.bedrooms} Bedrooms`,
  guests: `Max ${offer.max_adults}  adults`,
  facilities: offer.goods,
  author: {
    name: offer.host.name,
    avatar: offer.host.avatar_url,
    isSuper: offer.host.is_pro,
  },
  text: [offer.description],
  coordinates: [
    offer.location.latitude,
    offer.location.longitude
  ],
  zoom: offer.location.zoom,
  cityId: cities.find((city) => city.name === offer.city.name).id
});
