export interface Place {
  name: string;
  description: string;
  priceRange: string;
  advantages: string[];
  disadvantages: string[];
}

export interface CityGuideData {
  cityName: string;
  overview: string;
  bestTimeToVisit: string;
  currency: string;
  spots: Place[];
  hotels: Place[];
  restaurants: Place[];
}

export interface SectionProps {
  title: string;
  icon: React.ReactNode;
  items: Place[];
  colorClass: string;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
