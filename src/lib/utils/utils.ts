//import type { DemoProperty } from '@/types/demo-property';
import { addDays, format, startOfToday } from 'date-fns';

//To Check the availability of the property, we need to generate a list of available dates based on the number of open days and any blocked date ranges. The buildAvailabilityDates function takes in the number of open days and an array of blocked date ranges, and returns an array of available dates in the format 'yyyy-MM-dd'.
export default function buildAvailabilityDates(openDays: number, blockedRanges: Array<{
    startOffset: number;
    endOffset: number;
}>) {
    const today = startOfToday();
    const blocked = new Set<string>();
    for (const range of blockedRanges) {
        for (let offset = range.startOffset; offset <= range.endOffset; offset += 1) {
            blocked.add(format(addDays(today, offset), 'yyyy-MM-dd'));
        }
    }
    return Array.from({ length: openDays }, (_, index) => format(addDays(today, index), 'yyyy-MM-dd')).filter((date) => !blocked.has(date));
}