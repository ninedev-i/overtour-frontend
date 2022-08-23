export interface ToursFilter {
   page: number;
   period?: Date[];
   tags?: string | null;
   region?: string | null;
   price?: [number, number] | null;
   duration?: [number, number] | null;
}

export interface ToursState {
   regions: string[];
   tours: Tour[];
   filter: ToursFilter;
   directions: Direction[];
}

export interface Tour {
   id: number;
}

interface Direction {
   value: string;
   caption: string;
}

export interface TourInfo {
   id: number;
   title: string;
   date_from: string;
   date_to: string;
   duration: string;
   image: string;
   description: string;
   price: number;
   link: string;
   difficulty: number;
   region: string;
   tags: string;
}