export interface IProduct {
  name: string;
  price: number;
  rating: number; // 0 to 5
  reviews: number;
  colors: string[]; // array of hex color codes
  imageDefault: string;
  imageHover: string;
  image: string;
  category: string; 
}
