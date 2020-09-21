import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from '../models/contact.model';
import { Paging } from '../models/paging.model';
import { Sorting } from '../models/sorting.model';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(private readonly httpClient: HttpClient, private readonly utilitiesService: UtilitiesService) {}

  createContact(contact: Contact): Observable<Contact> {
    return this.httpClient.post(`/v2/contacts`, { contact }).pipe(
      map((response) => {
        const [created] = response['contacts'];

        return created;
      })
    );
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.httpClient
      .put<Contact>(`/v2/contacts/${contact.id}`, { contact })
      .pipe(
        map((response) => {
          const [updated] = response['contacts'];

          return updated;
        })
      );
  }

  deleteContact(id: string): Observable<void> {
    return this.httpClient.delete<void>(`/v2/contacts/${id}`);
  }

  getContacts(pagingSorting?: Paging & Sorting): Observable<Contact[]> {
    const queryParams: string = this.utilitiesService.convertToQueryParams(pagingSorting || {});

    return this.httpClient.get(`/v2/contacts${queryParams ? `?${queryParams}` : ''}`).pipe(
      map((response) => {
        return response['contacts'];
      })
    );
  }

  getContact(id: string): Observable<Contact> {
    return this.httpClient.get(`/v2/contacts/${id}`).pipe(
      map((response) => {
        return response['contact'];
      })
    );
  }

  getContactsCount(): Observable<number> {
    return this.httpClient.get(`/v2/contacts?page=1&pageSize=1`).pipe(
      map((response) => {
        return response['meta']['paging']['total'];
      })
    );
  }
}
