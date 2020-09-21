import { ContactType } from '../enums/contactType.enum';

export class Contact {
  id?: string;
  type?: ContactType;
  name?: string;
  countryId?: string;
}
