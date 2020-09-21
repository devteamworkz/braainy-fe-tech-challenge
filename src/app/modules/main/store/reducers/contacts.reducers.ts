import { createReducer, on } from '@ngrx/store';
import { Contact } from '../../models/contact.model';
import { contactsLoadedSuccess, contactUpdatedSuccess, loadContacts } from '../actions/contacts.actions';

let initialState: Contact[] = [];

const _contactsReducers = createReducer(
  initialState,
  on(loadContacts, () => undefined),
  on(contactsLoadedSuccess, (_, { payload }) => payload),
  on(contactUpdatedSuccess, (state, { payload }) => {
    state = [...state];

    const index = state.findIndex((contact) => contact.id === payload.id);

    state[index] = payload;

    return state;
  })
);

export function contactsReducers(state, action) {
  return _contactsReducers(state, action);
}
