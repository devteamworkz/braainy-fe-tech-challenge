import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { NotificationsService } from '../../../shared/services/notifications.service';
import { Product } from '../../models/product.model';
import {
  createProduct,
  productCreatedError,
  productCreatedSuccess,
  productUpdatedError,
  productUpdatedSuccess,
  updateProduct,
} from '../../store/actions/products.actions';
import { EditContactComponent } from '../edit-contact/edit-contact.component';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  editProductForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', []),
  });
  subscriptions: Subscription[] = [];

  constructor(
    private readonly matDialog: MatDialogRef<EditContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product; countryId: string },
    private readonly notificationsService: NotificationsService,
    private readonly store: Store<{}>,
    private readonly actions$: Actions
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.populateForm(this.data.product);
    }

    this.subscriptions.push(
      this.actions$.pipe(ofType(productCreatedSuccess, productCreatedError, productUpdatedSuccess, productUpdatedError)).subscribe((action) => {
        if (action.type === productCreatedSuccess.type) {
          this.notificationsService.success('Product created successfully!');
        } else if (action.type === productUpdatedSuccess.type) {
          this.notificationsService.success('Product updated successfully!');
        }

        this.matDialog.close();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  onUpdateProduct(): void {
    const name = this.editProductForm.controls['name'].value;
    const description = this.editProductForm.controls['description'].value;

    if (this.data) {
      this.store.dispatch(updateProduct({ id: this.data.product.id, name, description }));
    } else {
      this.store.dispatch(createProduct({ name, description }));
    }
  }

  populateForm(product: Product): void {
    const { name, description } = product;

    this.editProductForm.controls['name'].setValue(name);
    this.editProductForm.controls['description'].setValue(description);
  }
}
