import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMessage } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  @Output() onSendMessage: EventEmitter<string> = new EventEmitter();

  @Input() messages: Array<IMessage> = [];

  constructor() {}

  ngOnInit(): void {
    console.log('MESSAGES', this.messages);
  }

  public sendMessage(message: string): void {
    this.onSendMessage.emit(message);
  }
}
