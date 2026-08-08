import { US_LISTINGS_SEED } from "@/data/seed/listings";
import type { DemoProperty } from "@/types/demo-property";
export type { DemoProperty } from "@/types/demo-property";
let inMemoryCache: DemoProperty[] | null = null;
export async function fetchDemoProperties(): Promise<DemoProperty[]> {
    if (inMemoryCache)
        return inMemoryCache;
    inMemoryCache = US_LISTINGS_SEED;
    return inMemoryCache;
}