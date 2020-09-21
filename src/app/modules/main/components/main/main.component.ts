import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { NotificationsService } from '../../../shared/services/notifications.service';
import { Contact } from '../../models/contact.model';
import { Organization } from '../../models/organization.model';
import { Paging } from '../../models/paging.model';
import { Product } from '../../models/product.model';
import { Sorting } from '../../models/sorting.model';
import { ContactsService } from '../../services/contacts.service';
import { MainService } from '../../services/main.service';
import { ProductsService } from '../../services/products.service';
import { StorageService } from '../../services/storage.service';
import { contactCreatedSuccess, contactDeletedSuccess, deleteContact, loadContacts } from '../../store/actions/contacts.actions';
import { deleteProduct, loadProducts, productCreatedSuccess, productDeletedSuccess } from '../../store/actions/products.actions';
import { EditContactComponent } from '../edit-contact/edit-contact.component';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  private readonly _contactSettingsCookieKey = 'contact_settings';
  private readonly _productSettingsCookieKey = 'product_settings';

  organization: Observable<Organization>;
  contacts: Observable<Contact[]>;
  products: Observable<Product[]>;
  productsCount: Observable<number>;
  contactsCount: Observable<number>;
  sortProperty: string;
  page: number = 1;
  pageSize: number = 100;
  searchValue: string = '';
  selectedTabIndex: number;
  contactSettings: Contact;
  productSettings: Product;
  subscriptions: Subscription[] = [];

  constructor(
    private readonly mainService: MainService,
    private readonly contactsService: ContactsService,
    private readonly productsService: ProductsService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly storageService: StorageService,
    private readonly matDialog: MatDialog,
    private readonly store: Store<{ contacts: Contact[]; products: Product[] }>,
    private readonly actions$: Actions,
    private readonly notificationsService: NotificationsService
  ) {}

  ngOnInit() {
    this.organization = this.mainService.getOrganization();
    this.contactsCount = this.contactsService.getContactsCount();
    this.productsCount = this.productsService.getProductsCount();

    this.contacts = this.store.select('contacts');
    this.products = this.store.select('products');

    this.applyPaging();
    this.initContactSettings();
    this.initProductSettings();

    this.subscriptions.push(
      this.route.queryParams.subscribe((params) => {
        const { page, pageSize, sortProperty, sortDirection } = params as Paging & Sorting;

        this.sortProperty = `${sortProperty}-${sortDirection}`;
        this.page = page;
        this.pageSize = pageSize;

        this.store.dispatch(loadContacts({ page, pageSize, sortProperty, sortDirection }));
        this.store.dispatch(loadProducts({ page, pageSize, sortProperty, sortDirection }));
      })
    );

    this.subscriptions.push(
      this.actions$.pipe(ofType(contactCreatedSuccess, contactDeletedSuccess, productCreatedSuccess, productDeletedSuccess)).subscribe((action) => {
        if (action.type === contactDeletedSuccess.type) {
          this.notificationsService.success('Contact deleted successfully!');
        } else if (action.type === productDeletedSuccess.type) {
          this.notificationsService.success('Product deleted successfully!');
        }

        const { page, pageSize, sortProperty, sortDirection } = this.route.snapshot.queryParams as Paging & Sorting;

        this.store.dispatch(loadContacts({ page, pageSize, sortProperty, sortDirection }));
        this.store.dispatch(loadProducts({ page, pageSize, sortProperty, sortDirection }));

        this.contactsCount = this.contactsService.getContactsCount();
        this.productsCount = this.productsService.getProductsCount();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  onSort(): void {
    const [sortProperty, sortDirection] = this.sortProperty.split('-');

    this.router.navigate([], { queryParamsHandling: 'merge', queryParams: { sortProperty, sortDirection } });
  }

  onPageChange(e: PageEvent): void {
    this.router.navigate([], { queryParamsHandling: 'merge', queryParams: { page: e.pageIndex + 1, pageSize: e.pageSize } });
  }

  onSelectedIndexChange(index: number): void {
    this.selectedTabIndex = index;

    // reset the search value
    this.searchValue = '';

    // go to page 1 to prevent ending up on a non existing page
    this.router.navigate([], { queryParamsHandling: 'merge', queryParams: { page: 1 } });
  }

  onContactSettingsChanged(): void {
    this.storageService.setItem(this._contactSettingsCookieKey, JSON.stringify(this.contactSettings));
  }

  onProductSettingsChanged(): void {
    this.storageService.setItem(this._productSettingsCookieKey, JSON.stringify(this.productSettings));
  }

  onAddContact(organization: Organization): void {
    this.matDialog.open(EditContactComponent, { data: { countryId: organization.countryId } });
  }

  onEditContact(contact: Contact): void {
    this.matDialog.open(EditContactComponent, { data: { contact } });
  }

  onDeleteContact(contact: Contact): void {
    this.store.dispatch(deleteContact(contact.id));
  }

  onAddProduct(): void {
    this.matDialog.open(EditProductComponent);
  }

  onEditProduct(product: Product): void {
    this.matDialog.open(EditProductComponent, { data: { product } });
  }

  onDeleteProduct(product: Product): void {
    this.store.dispatch(deleteProduct(product.id));
  }

  private applyPaging(): void {
    const page = this.route.snapshot.queryParams['page'] || this.page;
    const pageSize = this.route.snapshot.queryParams['pageSize'] || this.pageSize;

    this.router.navigate([], { queryParamsHandling: 'merge', queryParams: { page, pageSize } });
  }

  private initContactSettings(): void {
    const value = this.storageService.getItem(this._contactSettingsCookieKey);

    this.contactSettings = value ? JSON.parse(value) : {};
  }

  private initProductSettings(): void {
    const value = this.storageService.getItem(this._productSettingsCookieKey);

    this.productSettings = value ? JSON.parse(value) : {};
  }
}
