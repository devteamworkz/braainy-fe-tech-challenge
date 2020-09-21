import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  exports: [MatProgressSpinnerModule, MatInputModule],
})
export class MaterialModule {}
