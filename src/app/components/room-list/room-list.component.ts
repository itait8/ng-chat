import { Component, Input } from '@angular/core';
import { IChatRoom } from '../../models';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss',
})
export class RoomListComponent {
  @Input() rooms: Array<IChatRoom> = [];
}
