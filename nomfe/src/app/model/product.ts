export interface Product {
  id?: number;
  name?: string;
  is_available?: boolean;
  sold_amount?: number;
  picture?: string;
  description?: string;
  owner?: string;
  categories?: any;
  option_set?: any;
}