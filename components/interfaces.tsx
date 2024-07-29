export interface AllFilterOptions {
  options: FilterOption[];
  id: string;
  displayName: string;
}

export interface FilterOption {
  id: string;
  value: string;
}

export interface Car {
  resource: CarResource;
}

export interface CarResource {
  [key: string]: any;
  id: string;
  latitude?: number;
  location: string;
  longitude?: number;
  fuelType: string;
  model: string;
  brand: string;
  alias: string;
  options?: {
    winterTires: boolean;
    towbar: boolean;
  }
  price: {
    hourRate: number;
  }
}