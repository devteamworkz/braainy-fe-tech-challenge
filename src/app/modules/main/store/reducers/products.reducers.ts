import { createReducer, on } from '@ngrx/store';
import { Product } from '../../models/product.model';
import { loadProducts, productsLoadedSuccess, productUpdatedSuccess } from '../actions/products.actions';

let initialState: Product[];

const _productsReducers = createReducer(
  initialState,
  on(loadProducts, () => undefined),
  on(productsLoadedSuccess, (_, { payload }) => payload),
  on(productUpdatedSuccess, (state, { payload }) => {
    state = [...state];

    const index = state.findIndex((product) => product.id === payload.id);

    state[index] = payload;

    return state;
  })
);

export function productsReducers(state, action) {
  return _productsReducers(state, action);
}
