import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const MODULES = [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule];

const MODULES_WITH_PROVIDERS = [];

const COMPONENTS = [];

const DIRECTIVES = [];

const PIPES = [];

const SERVICES = [];

const GUARDS = [];

const PROVIDERS = [];

const INTERCEPTORS = [];

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
