import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ContactsService } from '../../services/contacts.service';

@Injectable()
export class ContactEffects {
  loadContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Contacts Page] Load Contact'),
      mergeMap(({ payload }) =>
        this.contactsService.getContact(payload).pipe(
          map((contact) => ({ type: '[Contacts API] Contact Loaded Success', payload: contact })),
          catchError(() => of({ type: '[Contacts API] Contact Loaded Error' }))
        )
      )
    )
  );

  constructor(private readonly actions$: Actions, private readonly contactsService: ContactsService) {}
}
