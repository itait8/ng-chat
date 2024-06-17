import { Component, Input } from '@angular/core';
import { IChatRoom } from '../../models';
import { MaterialModule } from '../../material/material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [MaterialModule, RouterModule],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss',
})
export class RoomListComponent {
  @Input() rooms: Array<IChatRoom> = [];
}
