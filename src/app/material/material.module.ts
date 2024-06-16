import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

const Modules: any = [MatToolbarModule, MatButtonModule, MatListModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...Modules],
  exports: Modules,
})
export class MaterialModule {}
