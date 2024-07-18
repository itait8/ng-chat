import { Routes } from '@angular/router';
import { ChatContainerComponent } from './components/chat-container/chat-container.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: 'chat',
    component: ChatContainerComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '**',
        canActivate: [AuthGuardService],
        component: ChatContainerComponent,
      },
    ],
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
