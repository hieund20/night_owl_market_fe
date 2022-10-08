import { createReducer, on } from '@ngrx/store';
import {
  addToCart,
  checkoutSuccess,
  deleteFromCart,
} from './../actions/cart.actions';

export const initialState = 0;

//In this case, the calculator only with destination for Header component detect change
export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state) => state + 1),
  on(deleteFromCart, (state) => state - 1),
  on(checkoutSuccess, (state) => state + 2)
);
