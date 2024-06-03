import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

const Modules: any = [MatToolbarModule, MatButtonModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...Modules],
  exports: Modules,
})
export class MaterialModule {}
