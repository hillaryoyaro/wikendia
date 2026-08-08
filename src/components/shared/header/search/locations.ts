export interface LocationOption {
  id: string;
  name: string;
  description?: string;
}

export interface LocationGroup {
  title: string;
  locations: LocationOption[];
}

export const LOCATION_GROUPS: LocationGroup[] = [
  {
    title: "Popular destinations",
    locations: [
      {
        id: "nairobi",
        name: "Nairobi, Kenya",
        description: "Capital city",
      },
      {
        id: "mombasa",
        name: "Mombasa, Kenya",
        description: "Coastal city",
      },
      {
        id: "kisumu",
        name: "Kisumu, Kenya",
        description: "Lake Victoria",
      },
      {
        id: "diani",
        name: "Diani Beach, Kenya",
        description: "Beach destination",
      },
    ],
  },

  {
    title: "International",
    locations: [
      {
        id: "dubai",
        name: "Dubai, United Arab Emirates",
        description: "City destination",
      },
      {
        id: "zanzibar",
        name: "Zanzibar, Tanzania",
        description: "Island destination",
      },
      {
        id: "cape-town",
        name: "Cape Town, South Africa",
        description: "Coastal city",
      },
    ],
  },
];