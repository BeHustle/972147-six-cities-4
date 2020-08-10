export interface OfferInterface {
  id: number,
  name: string,
  price: number,
  image: string,
  type: string,
  isPremium: boolean,
  inBookmarks: boolean,
  rating: number,
  coordinates: Array<number>,
  zoom: number,
  images: Array<string>,
  rooms: string,
  guests: string,
  facilities: Array<string>,
  author: {
    name: string,
    avatar: string | null,
    isSuper: boolean
  },
  houseType: string,
  text: Array<string>,
  cityId: number
}

export interface CityInterface {
  id: number,
  name: string,
  coordinates: Array<number>,
  zoom: number
}

export interface UserInfoInterface {
  img: string,
  email: string,
  name: string,
  isPro: boolean
}

export interface ReviewInterface {
  id: number,
  author: {
    name: string,
    avatar: string,
  },
  text: string
  rating: number,
  date: Date,
}
