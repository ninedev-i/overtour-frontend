export interface ToursState {
   regions: string[];
   tours: Tour[];
   filter: {
      page: number;
      period: Date[];
      tags: string | null;
      region: string | null;
      price: [number, number] | null;
      duration: [number, number] | null;
   };
   directions: Direction[];
}

export interface Tour {
   id: number;
}

interface Direction {
   value: string;
   caption: string;
}
