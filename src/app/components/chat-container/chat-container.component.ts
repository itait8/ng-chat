import { Component } from '@angular/core';
import { RoomListComponent } from '../room-list/room-list.component';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';
import { IChatRoom } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-container',
  standalone: true,
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.scss',
  imports: [RoomListComponent, CommonModule],
})
export class ChatContainerComponent {
  public rooms: Observable<Array<IChatRoom>>;

  constructor(private chatService: ChatService) {
    this.rooms = chatService.getRooms();
    console.log(this.rooms);
  }
}
