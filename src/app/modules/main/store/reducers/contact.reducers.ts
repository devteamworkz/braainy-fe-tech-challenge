import { createReducer, on } from '@ngrx/store';
import { Contact } from '../../models/contact.model';
import { contactLoadedSuccess } from '../actions/contact.actions';

let initialState: Contact;

const _contactReducers = createReducer(
  initialState,
  on(contactLoadedSuccess, (_, { payload }) => payload)
);

export function contactReducers(state, action) {
  return _contactReducers(state, action);
}
