import { redirect } from "next/navigation";

export function redirectWithBookingError(
    listingId: string,
    message: string
): never {
    redirect(
        `/listings/${listingId}?booking=error&message=${encodeURIComponent(
            message
        )}`
    );
}