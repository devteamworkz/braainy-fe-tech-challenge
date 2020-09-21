import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ContactsService } from '../../services/contacts.service';

@Injectable()
export class ContactsEffects {
  loadContacts$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Contacts Page] Load Contacts'),
      mergeMap(({ payload }) =>
        this.contactsService.getContacts(payload).pipe(
          map((contacts) => ({ type: '[Contacts API] Contacts Loaded Success', payload: contacts })),
          catchError(() => of({ type: '[Contacts API] Contacts Loaded Error' }))
        )
      )
    )
  );

  createContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Contacts Page] Create Contact'),
      mergeMap(({ payload }) =>
        this.contactsService.createContact(payload).pipe(
          map((contact) => ({ type: '[Contacts API] Contact Created Success', payload: contact })),
          catchError(() => of({ type: '[Contacts API] Contact Created Error' }))
        )
      )
    )
  );

  updateContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Contacts Page] Update Contact'),
      mergeMap(({ payload }) =>
        this.contactsService.updateContact(payload).pipe(
          map((contact) => ({ type: '[Contacts API] Contact Updated Success', payload: contact })),
          catchError(() => of({ type: '[Contacts API] Contact Updated Error' }))
        )
      )
    )
  );

  deleteContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Contacts Page] Delete Contact'),
      mergeMap(({ payload }) =>
        this.contactsService.deleteContact(payload).pipe(
          map(() => ({ type: '[Contacts API] Contact Deleted Success', payload })),
          catchError(() => of({ type: '[Contacts API] Contact Deleted Error' }))
        )
      )
    )
  );

  constructor(private readonly actions$: Actions, private readonly contactsService: ContactsService) {}
}
