import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor() {}

  /**
   * Converts an object's properties into a query params string
   * @param object
   */
  convertToQueryParams(object: object): string {
    return (
      Object.keys(object)
        // filter out non-primitive values
        .filter((k) => object[k] !== Object(object[k]))
        // filter out breaking values
        .filter((k) => {
          if (typeof object[k] === 'undefined') {
            return false;
          }

          if (typeof object[k] === 'boolean') {
            return true;
          }

          if (typeof object[k] === 'number') {
            return true;
          }

          if (typeof object[k] === 'string') {
            return object[k].length;
          }

          if (typeof object[k] === 'boolean') {
            return true;
          }

          if (typeof object[k] === 'bigint') {
            return false;
          }

          if (typeof object[k] === 'symbol') {
            return false;
          }

          return object[k];
        })
        // map to pairs
        .map((k) => `${k}=${object[k]}`)
        // convert to a query params string
        .join('&')
    );
  }
}
