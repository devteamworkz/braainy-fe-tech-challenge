import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from '../material/material.module';
import { TokenInterceptor } from './interceptors/token.interceptor';

const MODULES = [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, HttpClientModule];

const MODULES_WITH_PROVIDERS = [ToastrModule.forRoot()];

const COMPONENTS = [];

const DIRECTIVES = [];

const PIPES = [];

const SERVICES = [];

const GUARDS = [];

const PROVIDERS = [];

const INTERCEPTORS = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  },
];

@NgModule({
  imports: [...MODULES, ...MODULES_WITH_PROVIDERS],
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES],
  exports: [...MODULES, ...COMPONENTS, ...DIRECTIVES, ...PIPES],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [...SERVICES, ...GUARDS, ...PROVIDERS, ...PIPES, ...INTERCEPTORS],
    };
  }
}
