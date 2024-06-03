import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, AsyncPipe, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public isLoggedIn$: Observable<boolean>;
  constructor(private authService: AuthService) {
    this.isLoggedIn$ = authService.isLoggenIn();
  }

  ngOnInit(): void {}

  public loginWithGoogle(): void {
    this.authService.signInWithGoogle();
  }

  public signOut(): void {
    this.authService.signOut();
  }
}
