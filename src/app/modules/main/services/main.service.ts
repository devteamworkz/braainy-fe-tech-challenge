import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Organization } from '../models/organization.model';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private readonly httpClient: HttpClient) {}

  getOrganization(): Observable<Organization> {
    return this.httpClient.get<Organization>(`/v2/organization`).pipe(
      map((response) => {
        return response['organization'];
      })
    );
  }
}
