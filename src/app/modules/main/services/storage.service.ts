import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { IStorage } from '../interfaces/storage.interface';
import { CookiesStorage } from '../models/cookieStorage.model';

@Injectable({ providedIn: 'root' })
export class StorageService implements IStorage {
  storage: IStorage;

  constructor(@Inject(PLATFORM_ID) readonly platformId: Object, readonly cookieService: CookieService) {
    this.storage = new CookiesStorage(cookieService);
  }

  getItem(key: string): string {
    return this.storage.getItem(key);
  }

  setItem(key: string, value: string): void {
    return this.storage.setItem(key, value);
  }

  removeItem(key: string): void {
    return this.storage.removeItem(key);
  }
}
