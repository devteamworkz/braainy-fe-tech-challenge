import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ProductsService } from '../../services/products.service';

@Injectable()
export class ProductsEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Products Page] Load Products'),
      mergeMap(({ payload }) =>
        this.productsService.getProducts(payload).pipe(
          map((products) => ({ type: '[Products API] Products Loaded Success', payload: products })),
          catchError(() => of({ type: '[Products API] Products Loaded Error' }))
        )
      )
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Products Page] Create Product'),
      mergeMap(({ payload }) =>
        this.productsService.createProduct(payload).pipe(
          map((product) => ({ type: '[Products API] Product Created Success', payload: product })),
          catchError(() => of({ type: '[Products API] Product Created Error' }))
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Products Page] Update Product'),
      mergeMap(({ payload }) =>
        this.productsService.updateProduct(payload).pipe(
          map((product) => ({ type: '[Products API] Product Updated Success', payload: product })),
          catchError(() => of({ type: '[Products API] Product Updated Error' }))
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Products Page] Delete Product'),
      mergeMap(({ payload }) =>
        this.productsService.deleteProduct(payload).pipe(
          map(() => ({ type: '[Products API] Product Deleted Success', payload })),
          catchError(() => of({ type: '[Products API] Product Deleted Error' }))
        )
      )
    )
  );

  constructor(private readonly actions$: Actions, private readonly productsService: ProductsService) {}
}
