import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

export interface ExperienceDetail extends Experience {
  slots: Slot[];
}

export interface BookingData {
  experienceId: number;
  slotId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  numberOfPeople: number;
  promoCode?: string;
}

export interface BookingResponse {
  success: boolean;
  booking: {
    id: number;
    experienceTitle: string;
    customerName: string;
    customerEmail: string;
    numberOfPeople: number;
    totalPrice: number;
    discount: number;
    status: string;
  };
}

export interface PromoValidation {
  valid: boolean;
  code?: string;
  discountType?: string;
  discountValue?: number;
  discount?: number;
  finalPrice?: number;
  error?: string;
}

// API functions
export const fetchExperiences = async (): Promise<Experience[]> => {
  const response = await api.get('/experiences');
  return response.data;
};

export const fetchExperienceById = async (id: number): Promise<ExperienceDetail> => {
  const response = await api.get(`/experiences/${id}`);
  return response.data;
};

export const createBooking = async (data: BookingData): Promise<BookingResponse> => {
  const response = await api.post('/bookings', data);
  return response.data;
};

export const validatePromoCode = async (
  code: string,
  experienceId: number,
  numberOfPeople: number
): Promise<PromoValidation> => {
  const response = await api.post('/promo/validate', {
    code,
    experienceId,
    numberOfPeople,
  });
  return response.data;
};

export default api;