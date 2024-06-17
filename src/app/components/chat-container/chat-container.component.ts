import { Component, OnDestroy } from '@angular/core';
import { RoomListComponent } from '../room-list/room-list.component';
import { ChatService } from '../../services/chat.service';
import { Observable, Subscription, filter } from 'rxjs';
import { IChatRoom, IMessage } from '../../models';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../chat/chat.component';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent,
} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-chat-container',
  standalone: true,
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.scss',
  imports: [RoomListComponent, CommonModule, ChatComponent],
})
export class ChatContainerComponent implements OnDestroy {
  private subscription: Subscription = new Subscription();

  public rooms$: Observable<Array<IChatRoom>>;
  public messages$: Observable<Array<IMessage>> | undefined;

  constructor(
    private chatService: ChatService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.rooms$ = chatService.getRooms();

    const roomId: string = location.path().split('/')[2];
    //roomId ? (this.messages$ = chatService.getRoomMessages(roomId)) : '';

    this.subscription.add(
      router.events
        .pipe(filter((data) => data instanceof NavigationEnd))
        .subscribe((data) => {
          const routeEvent: RouterEvent = data as RouterEvent;
          const urlArr = routeEvent.url.split('/');
          if (urlArr.length > 2) {
            this.messages$ = this.chatService.getRoomMessages(urlArr[2]);
          }
        })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
