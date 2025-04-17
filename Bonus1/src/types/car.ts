export interface Car {
  Model_ID: number;
  Make_Name: string;
  Model_Name: string;
  VehicleTypeName?: string;
  imageUrl?: string;
  year?: number;
  description?: string;
  price?: number;
  specifications?: {
    engine?: string;
    transmission?: string;
    drivetrain?: string;
    horsepower?: number;
    acceleration?: string;
    topSpeed?: string;
  };
}

export interface CarDetails {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
  VehicleTypeName: string;
  VehicleTypeId: number;
  Year: number;
  Description?: string;
  ImageUrl?: string;
  Price?: string;
  Features?: string[];
}

export interface CarSearchResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: Car[];
} 