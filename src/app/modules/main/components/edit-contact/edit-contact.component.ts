import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { NotificationsService } from '../../../shared/services/notifications.service';
import { Contact } from '../../models/contact.model';
import {
  contactCreatedError,
  contactCreatedSuccess,
  contactUpdatedError,
  contactUpdatedSuccess,
  createContact,
  updateContact,
} from '../../store/actions/contacts.actions';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss'],
})
export class EditContactComponent implements OnInit {
  editContactForm: FormGroup = new FormGroup({
    type: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
  });
  subscriptions: Subscription[] = [];

  constructor(
    private readonly matDialog: MatDialogRef<EditContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { contact: Contact; countryId: string },
    private readonly notificationsService: NotificationsService,
    private readonly store: Store<{}>,
    private readonly actions$: Actions
  ) {}

  ngOnInit(): void {
    if (this.data.contact) {
      this.populateForm(this.data.contact);
    }

    this.subscriptions.push(
      this.actions$.pipe(ofType(contactCreatedSuccess, contactCreatedError, contactUpdatedSuccess, contactUpdatedError)).subscribe((action) => {
        if (action.type === contactCreatedSuccess.type) {
          this.notificationsService.success('Contact created successfully!');
        } else if (action.type === contactUpdatedSuccess.type) {
          this.notificationsService.success('Contact updated successfully!');
        }

        this.matDialog.close();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  onUpdateContact(): void {
    const type = this.editContactForm.controls['type'].value;
    const name = this.editContactForm.controls['name'].value;

    if (this.data.contact) {
      this.store.dispatch(updateContact({ id: this.data.contact.id, type, name }));
    } else {
      this.store.dispatch(createContact({ countryId: this.data.countryId, type, name }));
    }
  }

  populateForm(contact: Contact): void {
    const { type, name } = contact;

    this.editContactForm.controls['type'].setValue(type);
    this.editContactForm.controls['name'].setValue(name);
  }
}
