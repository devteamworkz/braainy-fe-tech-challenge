import { CookieService } from 'ngx-cookie-service';
import { IStorage } from '../interfaces/storage.interface';

export class CookiesStorage implements IStorage {
  constructor(private readonly cookieService: CookieService) {}

  getItem(key: string): string {
    return this.cookieService.get(key);
  }

  setItem(key: string, value: string): void {
    this.cookieService.set(key, value);
  }

  removeItem(key: string): void {
    this.cookieService.delete(key);
  }
}
