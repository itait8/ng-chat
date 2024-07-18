import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RoomListComponent } from '../room-list/room-list.component';
import { ChatService } from '../../services/chat.service';
import { Observable, Subscription, filter } from 'rxjs';
import { IChatRoom, IMessage } from '../../models';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../chat/chat.component';
import {
  ActivatedRoute,
  ActivationEnd,
  NavigationEnd,
  Router,
  RouterEvent,
} from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddRoomComponent } from '../add-room/add-room.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat-container',
  standalone: true,
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.scss',
  imports: [RoomListComponent, CommonModule, ChatComponent],
})
export class ChatContainerComponent implements OnDestroy, OnInit {
  private subscription: Subscription = new Subscription();
  private UserId: string = '';
  private roomId: string = '';
  public rooms$: Observable<Array<IChatRoom>>;
  public messages$: Observable<Array<IMessage>> | undefined;

  constructor(
    private chatService: ChatService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog,
    private auth: AuthService
  ) {
    this.rooms$ = chatService.getRooms();

    /*     location.path().split('/')[2]!!
      ? (this.roomId = location.path().split('/')[2])
      : (this.roomId = '');
    roomId ? (this.messages$ = chatService.getRoomMessages(roomId)) : ''; */

    this.subscription.add(
      router.events
        .pipe(filter((data) => data instanceof NavigationEnd))
        .subscribe((data) => {
          const routeEvent: RouterEvent = data as RouterEvent;
          const urlArr = routeEvent.url.split('/');
          if (urlArr.length > 2) {
            this.messages$ = this.chatService.getRoomMessages(urlArr[2]);
            this.roomId = urlArr[2];
          }
        })
    );
  }

  ngOnInit(): void {
    this.subscription.add(
      this.auth
        .getUserData()
        .pipe(filter((data) => !!data))
        .subscribe((user) => (this.UserId = user.uid))
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public openAddRoomModal(): void {
    const dialogRef = this.dialog.open(AddRoomComponent, {
      panelClass: 'custom-container',
    });
    dialogRef
      .afterClosed()
      .subscribe((result) => this.onAddRoom(result, this.UserId));
  }

  public onAddRoom(roomName: string, userId: string) {
    this.chatService.addRoom(roomName, userId);
  }

  public onSendMessage(message: string): void {
    if (this.UserId && this.roomId)
      this.chatService.sendMessage(this.UserId, message, this.roomId);
  }
}
