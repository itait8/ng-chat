import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const Modules: any = [];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...Modules],
  exports: Modules,
})
export class MaterialModule {}
