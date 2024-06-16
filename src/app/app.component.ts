import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { ChatContainerComponent } from './components/chat-container/chat-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [HeaderComponent, RouterOutlet, ChatContainerComponent],
})
export class AppComponent {
  title = 'ng-chat';

  constructor(private AuthService: AuthService) {}

  public signInWithGoogle() {
    this.AuthService.signInWithGoogle();
  }
}
