import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Paging } from '../models/paging.model';
import { Product } from '../models/product.model';
import { Sorting } from '../models/sorting.model';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private readonly httpClient: HttpClient, private readonly utilitiesService: UtilitiesService) {}

  createProduct(product: Product): Observable<Product> {
    return this.httpClient.post(`/v2/products`, { product }).pipe(
      map((response) => {
        const [created] = response['products'];

        return created;
      })
    );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.httpClient
      .put<Product>(`/v2/products/${product.id}`, { product })
      .pipe(
        map((response) => {
          const [updated] = response['products'];

          return updated;
        })
      );
  }

  deleteProduct(id: string): Observable<void> {
    return this.httpClient.delete<void>(`/v2/products/${id}`);
  }

  getProducts(pagingSorting?: Paging & Sorting): Observable<Product[]> {
    const queryParams: string = this.utilitiesService.convertToQueryParams(pagingSorting || {});

    return this.httpClient.get(`/v2/products${queryParams ? `?${queryParams}` : ''}`).pipe(
      map((response) => {
        return response['products'];
      })
    );
  }

  getProduct(id: string): Observable<Product> {
    return this.httpClient.get(`/v2/products/${id}`).pipe(
      map((response) => {
        return response['product'];
      })
    );
  }

  getProductsCount(): Observable<number> {
    return this.httpClient.get(`/v2/products?page=1&pageSize=1`).pipe(
      map((response) => {
        return response['meta']['paging']['total'];
      })
    );
  }
}
