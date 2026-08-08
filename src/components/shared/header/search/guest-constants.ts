import { MAX_INFANTS } from "@/features/reservations/domain/booking-rules";

export const GUEST_LIMITS = {
  adults: {
    min: 1,
    max: 20,
  },

  children: {
    min: 0,
    max: 20,
  },

  infants: {
    min: 0,
    max: MAX_INFANTS,
  },
};