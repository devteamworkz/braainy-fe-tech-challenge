import { createReducer, on } from '@ngrx/store';
import { Product } from '../../models/product.model';
import { productLoadedSuccess } from '../actions/product.actions';

let initialState: Product;

const _productReducers = createReducer(
  initialState,
  on(productLoadedSuccess, (_, { payload }) => payload)
);

export function productReducers(state, action) {
  return _productReducers(state, action);
}
