export interface ToursState {
   regions: string[];
   tours: Tour[];
   filter: {
      period: Date[];
      tags: string | null;
      region: string | null;
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
