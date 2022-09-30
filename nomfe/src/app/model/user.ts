export interface User {
  id?: number;
  avatar?: string;
  date_joined?: Date;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: number;
  provider?: number;
  is_active?: boolean;
  is_business?: boolean;
  is_staff?: boolean;
  is_superuser?: boolean;
  verified?: boolean;
  groups?: any;
  user_permissions?: any;
  balance?: string;
  cart_quantity?: number;
}
