import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './components/main/main.component';
import { MainRoutingModule } from './main-routing.module';
import { ContactEffects } from './store/effects/contact.effects';
import { ContactsEffects } from './store/effects/contacts.effects';
import { ProductEffects } from './store/effects/product.effects';
import { ProductsEffects } from './store/effects/products.effects';
import { contactReducers } from './store/reducers/contact.reducers';
import { contactsReducers } from './store/reducers/contacts.reducers';
import { productReducers } from './store/reducers/product.reducers';
import { productsReducers } from './store/reducers/products.reducers';

@NgModule({
  declarations: [MainComponent],
  imports: [
    SharedModule,
    MainRoutingModule,
    StoreModule.forFeature('contact', contactReducers),
    StoreModule.forFeature('contacts', contactsReducers),
    EffectsModule.forFeature([ContactEffects]),
    EffectsModule.forFeature([ContactsEffects]),
    StoreModule.forFeature('product', productReducers),
    StoreModule.forFeature('products', productsReducers),
    EffectsModule.forFeature([ProductEffects]),
    EffectsModule.forFeature([ProductsEffects]),
  ],
})
export class MainModule {}
