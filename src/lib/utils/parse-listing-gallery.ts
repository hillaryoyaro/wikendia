export function parseListingGallery(
    rawGallery: FormDataEntryValue | null
) {
    try {
        const value = JSON.parse(
            String(rawGallery ?? "[]")
        );

        return Array.isArray(value)
            ? value
            : [];
    } catch {
        return [];
    }
}