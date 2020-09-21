import { createAction } from '@ngrx/store';
import { Product } from '../../models/product.model';

export const loadProducts = createAction(
  '[Products Page] Load Products',
  (payload: { page: number; pageSize: number; sortProperty: string; sortDirection: string }) => ({ payload })
);
export const productsLoadedSuccess = createAction('[Products API] Products Loaded Success', (payload: Product[]) => ({ payload }));
export const productsLoadedError = createAction('[Products API] Products Loaded Error');

export const createProduct = createAction('[Products Page] Create Product', (payload: Product) => ({ payload }));
export const productCreatedSuccess = createAction('[Products API] Product Created Success', (payload: Product) => ({ payload }));
export const productCreatedError = createAction('[Products API] Product Created Error');

export const updateProduct = createAction('[Products Page] Update Product', (payload: Product) => ({ payload }));
export const productUpdatedSuccess = createAction('[Products API] Product Updated Success', (payload: Product) => ({ payload }));
export const productUpdatedError = createAction('[Products API] Product Updated Error');

export const deleteProduct = createAction('[Products Page] Delete Product', (payload: string) => ({ payload }));
export const productDeletedSuccess = createAction('[Products API] Product Deleted Success', (payload: string) => ({ payload }));
export const productDeletedError = createAction('[Products API] Product Deleted Error');
