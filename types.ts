
export interface HaircutService {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

export interface PressClip {
  id: string;
  media: string;
  title: string;
  date: string;
  link: string;
  imageUrl: string;
}

export interface BarberAdvice {
  recommendedStyle: string;
  explanation: string;
  maintenanceTip: string;
}

export interface BookingData {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  location: string;
}
