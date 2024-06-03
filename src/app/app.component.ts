import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [HeaderComponent, RouterOutlet],
})
export class AppComponent {
  title = 'ng-chat';

  constructor(private AuthService: AuthService) {}

  public signInWithGoogle() {
    this.AuthService.signInWithGoogle();
  }
}
