import { createAction } from '@ngrx/store';
import { Contact } from '../../models/contact.model';

export const loadContacts = createAction(
  '[Contacts Page] Load Contacts',
  (payload: { page: number; pageSize: number; sortProperty: string; sortDirection: string }) => ({ payload })
);
export const contactsLoadedSuccess = createAction('[Contacts API] Contacts Loaded Success', (payload: Contact[]) => ({ payload }));
export const contactsLoadedError = createAction('[Contacts API] Contacts Loaded Error');

export const createContact = createAction('[Contacts Page] Create Contact', (payload: Contact) => ({ payload }));
export const contactCreatedSuccess = createAction('[Contacts API] Contact Created Success', (payload: Contact) => ({ payload }));
export const contactCreatedError = createAction('[Contacts API] Contact Created Error');

export const updateContact = createAction('[Contacts Page] Update Contact', (payload: Contact) => ({ payload }));
export const contactUpdatedSuccess = createAction('[Contacts API] Contact Updated Success', (payload: Contact) => ({ payload }));
export const contactUpdatedError = createAction('[Contacts API] Contact Updated Error');

export const deleteContact = createAction('[Contacts Page] Delete Contact', (payload: string) => ({ payload }));
export const contactDeletedSuccess = createAction('[Contacts API] Contact Deleted Success', (payload: string) => ({ payload }));
export const contactDeletedError = createAction('[Contacts API] Contact Deleted Error');
