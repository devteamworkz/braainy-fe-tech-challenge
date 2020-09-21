import { createAction } from '@ngrx/store';
import { Product } from '../../models/product.model';

export const loadProduct = createAction('[Products Page] Load Product', (payload: string) => ({ payload }));
export const productLoadedSuccess = createAction('[Products API] Product Loaded Success', (payload: Product) => ({ payload }));
export const productLoadedError = createAction('[Products API] Product Loaded Error');
