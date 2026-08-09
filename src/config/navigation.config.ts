export type NavigationItem = {
  label: string;
  href: string;
};

export const mainNavigation: NavigationItem[] = [
  {
    label: "Explore",
    href: "/listings",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const authenticatedNavigation: NavigationItem[] = [
  {
    label: "Trips",
    href: "/account/trips",
  },
  {
    label: "Favorites",
    href: "/account/favorites",
  },
  {
    label: "Messages",
    href: "/account/messages",
  },
];

export const hostingNavigation: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/hosting/dashboard",
  },
  {
    label: "Listings",
    href: "/hosting/listings",
  },
  {
    label: "Reservations",
    href: "/hosting/reservations",
  },
  {
    label: "Calendar",
    href: "/hosting/calendar",
  },
];