import type { CitySlug } from "./location-types";

export type CityHeroImage = {
  src: string;
  alt: string;
};

export const cityHeroImages: Record<CitySlug, CityHeroImage> = {
  lucknow: {
    src: "/images/locations/lucknow-hero.png",
    alt: "Lucknow Charbagh Railway Station and gardens",
  },
  varanasi: {
    src: "/images/locations/varanasi-hero.png",
    alt: "Varanasi ghats along the Ganges at sunrise",
  },
  bhopal: {
    src: "/images/locations/bhopal-hero.png",
    alt: "Bhopal Upper Lake waterfront and city skyline",
  },
  indore: {
    src: "/images/locations/indore-hero.webp",
    alt: "Gandhi Hall historic town hall in Indore",
  },
  jaipur: {
    src: "/images/locations/jaipur-hero.webp",
    alt: "Jal Mahal water palace on Man Sagar Lake in Jaipur",
  },
  chandigarh: {
    src: "/images/locations/chandigarh-hero.webp",
    alt: "Rock Garden sculpture park in Chandigarh at golden hour",
  },
  nagpur: {
    src: "/images/locations/nagpur-hero.webp",
    alt: "Historic temple architecture in Nagpur",
  },
  coimbatore: {
    src: "/images/locations/coimbatore-hero.webp",
    alt: "Western Ghats valley and palm groves near Coimbatore",
  },
};

export function getCityHeroImage(slug: CitySlug): CityHeroImage {
  return cityHeroImages[slug];
}
