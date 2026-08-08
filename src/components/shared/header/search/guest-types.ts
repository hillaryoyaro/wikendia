export interface GuestState {
  adults: number;
  children: number;
  infants: number;
}

export interface GuestCounterProps {
  title: string;
  subtitle: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}