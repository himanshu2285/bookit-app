export interface Experience {
  id: number;
  title: string;
  description: string;
  location: string;
  price: number;
  image: string;
  category: string;
  duration: string;
  rating: number;
}

export interface Slot {
  id: number;
  experienceId: number;
  date: string;
  startTime: string;
  endTime: string;
  availableSpots: number;
  totalSpots: number;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  numberOfPeople: number;
  promoCode: string;
}