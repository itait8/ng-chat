import { Component, Input, OnInit } from '@angular/core';
import { IMessage } from '../../models';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  @Input() messages: Array<IMessage> = [];
  constructor() {}

  ngOnInit(): void {
    console.log('MESSAGES', this.messages);
  }
}
