import { Category } from './category';
export interface Product {
  id?: number;
  name?: string;
  is_available?: boolean;
  sold_amount?: number;
  picture?: string;
  description?: string;
  owner?: any;
  categories?: Category[];
  option_set?: any;
  rating_set?: any;
  min_price?: number;
  unit_in_stock?: number;
}
