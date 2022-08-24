export interface ToursFilter {
   page: number;
   period?: Date[];
   tags?: string | null;
   region?: string | null;
   price?: [number, number] | null;
   duration?: [number, number] | null;
}

export interface ToursList {
   meta: PaginationMeta;
   data: Tour[];
}

export interface ToursState {
   regions: string[];
   tours: ToursList | null;
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

export interface PaginationMeta {
   total?: number;
   per_page?: number;
   current_page?: number;
   last_page?: number;
   first_page?: number;
   first_page_url?: string;
   last_page_url?: string;
   next_page_url?: string;
   previous_page_url?: string;
}