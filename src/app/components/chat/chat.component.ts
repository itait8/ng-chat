import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IMessage } from '../../models';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Observable, timeout } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  private _messages: Array<IMessage> = [];
  @ViewChild('virtualScroll') virtualScroll?: CdkVirtualScrollViewport;

  @Output() onSendMessage: EventEmitter<string> = new EventEmitter();

  /*   @Input() set SortedMessages(
    messages$: Observable<Array<IMessage>> | undefined
  ) {
    messages$?.forEach((messages) => {
      this.sortedMessages = messages.sort((x, y) => {
        return x.timeStamp - y.timeStamp;
      });
    });
  } */

  @Input() set messages(messages: Array<IMessage>) {
    this._messages = messages;
  }

  get messages(): Array<IMessage> {
    return [
      ...this._messages.sort((x, y) => {
        return x.timeStamp - y.timeStamp;
      }),
    ];
  }
  public userId: string = '';
  constructor(private authService: AuthService) {
    authService.getUserData().subscribe((user) => (this.userId = user.uid));
  }

  ngOnInit(): void {}

  public sendMessage(message: string, input: HTMLInputElement): void {
    this.onSendMessage.emit(message);
    input.value = '';
  }
}
