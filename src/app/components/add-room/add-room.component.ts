import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-room',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.scss',
})
export class AddRoomComponent {
  constructor(public dialogRef: MatDialogRef<AddRoomComponent>) {}

  public closeModal(): void {}
}
