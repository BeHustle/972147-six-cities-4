export const offers = [
  {
    id: 1,
    name: `Beautiful & luxurious apartment at great locatccion`,
    price: 132,
    image: `img/apartment-01.jpg`,
    images: [
      `img/room.jpg`,
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`,
      `img/studio-01.jpg`,
      `img/apartment-01.jpg`,
    ],
    type: `hotel`,
    isPremium: true,
    inBookmarks: true,
    rating: 4.1,
    rooms: `3 Bedrooms`,
    guests: `Max 4 adults`,
    facilities: [`Wi-Fi`,
      `Washing machine`,
      `Towels`,
      `Heating`,
      `Coffee machine`,
      `Baby seat`,
      `Kitchen`,
      `Dishwasher`,
      `Cabel TV`,
      `Fridge`,
    ],
    author: {
      name: `Angelina`,
      avatar: `img/avatar-angelina.jpg`,
      isSuper: true,
    },
    text: [
      `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.
      The building is green and from 18th century.`,
      `An independent House, strategically located between Rembrand Square and National Opera, but where the
      bustle of the city comes to rest in this alley flowery and colorful.`,
    ],
    coordinates: [52.3909553943508, 4.85309666406198],
    cityId: 1,
    zoom: 10
  },
  {
    id: 2,
    name: `Wood and stone place`,
    price: 254,
    image: `img/apartment-02.jpg`,
    images: [
      `img/room.jpg`,
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`,
      `img/studio-01.jpg`,
      `img/apartment-01.jpg`,
    ],
    type: `apartment`,
    isPremium: false,
    inBookmarks: false,
    coordinates: [52.369553943508, 4.85309666406198],
    rating: 5,
    rooms: `1 Bedrooms`,
    guests: `Max 2 adults`,
    facilities: [`Wi-Fi`,
      `Washing machine`,
      `Towels`,
    ],
    author: {
      name: `Max`,
      avatar: `img/avatar-max.jpg`,
      isSuper: true,
    },
    text: [
      `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.
      The building is green and from 18th century.`,
      `An independent House, strategically located between Rembrand Square and National Opera, but where the
      bustle of the city comes to rest in this alley flowery and colorful.`,
    ],
    cityId: 1,
    zoom: 10
  },
  {
    id: 3,
    name: `Canal View Prinsengracht`,
    price: 178,
    image: `img/apartment-03.jpg`,
    images: [
      `img/room.jpg`,
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`,
      `img/studio-01.jpg`,
      `img/apartment-01.jpg`,
    ],
    type: `room`,
    isPremium: true,
    inBookmarks: true,
    rating: 3,
    coordinates: [48.85875194, 2.33926391],
    rooms: `2 Bedrooms`,
    guests: `Max 2 adults and 1 children`,
    facilities: [`Wi-Fi`,
      `Heating`,
      `Coffee machine`,
      `Baby seat`,
      `Kitchen`,
    ],
    author: {
      name: `Alex`,
      avatar: ``,
      isSuper: true,
    },
    text: [
      `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.
      The building is green and from 18th century.`,
      `An independent House, strategically located between Rembrand Square and National Opera, but where the
      bustle of the city comes to rest in this alley flowery and colorful.`,
    ],
    cityId: 2,
    zoom: 10
  },
  {
    id: 4,
    name: `Nice, cozy, warm big bed apartment`,
    price: 995,
    image: `img/room.jpg`,
    images: [
      `img/room.jpg`,
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`,
      `img/studio-01.jpg`,
      `img/apartment-01.jpg`,
    ],
    type: `house`,
    isPremium: true,
    inBookmarks: false,
    coordinates: [50.938361, 6.959974],
    rating: 1,
    rooms: `5 Bedrooms`,
    guests: `Max 3 adults and 2 children`,
    facilities: [`Wi-Fi`,
      `Kitchen`,
      `Dishwasher`,
      `Cabel TV`,
      `Fridge`,
    ],
    author: {
      name: `Steven`,
      avatar: ``,
      isSuper: true,
    },
    text: [
      `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.
      The building is green and from 18th century.`,
      `An independent House, strategically located between Rembrand Square and National Opera, but where the
      bustle of the city comes to rest in this alley flowery and colorful.`,
    ],
    cityId: 3,
    zoom: 10
  }];

export const serverOffers = [
  {
    "bedrooms": 3,
    "city": {
      "location": {
        "latitude": 52.370216,
        "longitude": 4.895168,
        "zoom": 10
      },
      "name": `Amsterdam`
    },
    "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    "goods": [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
    "host": {
      "avatar_url": `img/1.png`,
      "id": 3,
      "is_pro": true,
      "name": `Angelina`
    },
    "id": 1,
    "images": [`img/1.png`, `img/2.png`],
    "is_favorite": false,
    "is_premium": false,
    "location": {
      "latitude": 52.35514938496378,
      "longitude": 4.673877537499948,
      "zoom": 8
    },
    "max_adults": 4,
    "preview_image": `img/1.png`,
    "price": 120,
    "rating": 4.8,
    "title": `Beautiful & luxurious studio at great location`,
    "type": `apartment`
  }
];
