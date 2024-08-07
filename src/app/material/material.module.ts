import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatIconModule } from '@angular/material/icon';

const Modules: any = [
  MatToolbarModule,
  MatButtonModule,
  MatListModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  ScrollingModule,
  MatIconModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...Modules],
  exports: Modules,
})
export class MaterialModule {}
