import { createAction } from '@ngrx/store';
import { Contact } from '../../models/contact.model';

export const loadContact = createAction('[Contacts Page] Load Contact', (payload: string) => ({ payload }));
export const contactLoadedSuccess = createAction('[Contacts API] Contact Loaded Success', (payload: Contact) => ({ payload }));
export const contactLoadedError = createAction('[Contacts API] Contact Loaded Error');
