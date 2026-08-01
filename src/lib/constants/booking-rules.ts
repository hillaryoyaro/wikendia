/**
 * ============================================================================
 * Wikendia Booking Rules
 * ----------------------------------------------------------------------------
 * Centralized business rules and helper functions for reservations.
 * ============================================================================
 */

/**
 * Guest limits
 */
export const MIN_ADULTS = 1;
export const MIN_CHILDREN = 0;
export const MIN_INFANTS = 0;

export const MAX_INFANTS = 5;

/**
 * Reservation constraints
 */
export const MIN_BOOKING_NIGHTS = 1;
export const MAX_BOOKING_NIGHTS = 365;

/**
 * Pricing
 */
export const PROCESSING_FEE_RATE = 0.12; // 12%
export const SERVICE_FEE_RATE = 0.10; // 10%
export const TAX_RATE = 0; // configurable later

/**
 * Calculate number of nights.
 */
export function calculateNights(
    checkIn: Date,
    checkOut: Date
): number {
    return Math.ceil(
        (checkOut.getTime() - checkIn.getTime()) /
            (1000 * 60 * 60 * 24)
    );
}

/**
 * Calculate subtotal before fees.
 */
export function calculateSubtotal(
    nights: number,
    pricePerNight: number
): number {
    return nights * pricePerNight;
}

/**
 * Calculate processing fee.
 */
export function calculateProcessingFee(
    subtotal: number
): number {
    return Math.round(
        subtotal * PROCESSING_FEE_RATE
    );
}

/**
 * Calculate service fee.
 */
export function calculateServiceFee(
    subtotal: number
): number {
    return Math.round(
        subtotal * SERVICE_FEE_RATE
    );
}

/**
 * Calculate taxes.
 */
export function calculateTax(
    subtotal: number
): number {
    return Math.round(
        subtotal * TAX_RATE
    );
}

/**
 * Calculate total reservation price.
 */
export function calculateTotalPrice(
    subtotal: number,
    processingFee: number,
    serviceFee = 0,
    tax = 0
): number {
    return (
        subtotal +
        processingFee +
        serviceFee +
        tax
    );
}

/**
 * Validate booking duration.
 */
export function isBookingLengthValid(
    nights: number
): boolean {
    return (
        nights >= MIN_BOOKING_NIGHTS &&
        nights <= MAX_BOOKING_NIGHTS
    );
}

/**
 * Validate guest capacity.
 */
export function exceedsGuestCapacity(
    adults: number,
    children: number,
    infants: number,
    maxGuests: number
): boolean {
    return (
        adults +
            children +
            infants >
        maxGuests
    );
}