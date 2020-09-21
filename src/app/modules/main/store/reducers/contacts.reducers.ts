import { createReducer, on } from '@ngrx/store';
import { Contact } from '../../models/contact.model';
import { contactsLoadedSuccess, loadContacts } from '../actions/contacts.actions';

let initialState: Contact[];

const _contactsReducers = createReducer(
  initialState,
  on(loadContacts, () => undefined),
  on(contactsLoadedSuccess, (_, { payload }) => payload)
);

export function contactsReducers(state, action) {
  return _contactsReducers(state, action);
}
