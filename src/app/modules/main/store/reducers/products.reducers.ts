import { createReducer, on } from '@ngrx/store';
import { Product } from '../../models/product.model';
import { loadProducts, productsLoadedSuccess } from '../actions/products.actions';

let initialState: Product[] = [];

const _productsReducers = createReducer(
  initialState,
  on(loadProducts, () => undefined),
  on(productsLoadedSuccess, (_, { payload }) => payload)
);

export function productsReducers(state, action) {
  return _productsReducers(state, action);
}
