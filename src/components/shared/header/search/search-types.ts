import { DateRange } from "react-day-picker";

export type ActiveSearchPanel =
  | "where"
  | "when"
  | "who"
  | null;

export interface GuestState {
  adults: number;
  children: number;
  infants: number;
}

export interface SearchBarProps {
  initialLocation?: string;

  initialAdults?: string;
  initialChildren?: string;
  initialInfants?: string;
  initialGuests?: string;

  initialCheckIn?: string;
  initialCheckOut?: string;
}

export interface SearchItemProps {
  title: string;
  value: string;
  onClick: () => void;
}

export interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export interface DateSearchProps {
  range: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
}