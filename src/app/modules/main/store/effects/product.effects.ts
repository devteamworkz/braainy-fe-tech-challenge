import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ProductsService } from '../../services/products.service';

@Injectable()
export class ProductEffects {
  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Products Page] Load Product'),
      mergeMap(({ payload }) =>
        this.productsService.getProduct(payload).pipe(
          map((product) => ({ type: '[Products API] Product Loaded Success', payload: product })),
          catchError(() => of({ type: '[Products API] Product Loaded Error' }))
        )
      )
    )
  );

  constructor(private readonly actions$: Actions, private readonly productsService: ProductsService) {}
}
