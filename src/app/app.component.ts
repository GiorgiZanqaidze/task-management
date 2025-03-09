import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { logout } from './features/auth/store/auth.actions';
import { selectIsAuthenticated, selectUser } from './features/auth/store/auth.selectors';

@Component({
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule, CommonModule],
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <span>Task Management</span>
      <span class="spacer"></span>
      <ng-container *ngIf="isAuthenticated$ | async; else authButtons">
        <span>Welcome, {{ (user$ | async)?.name }}!</span>
        <button mat-button (click)="onLogout()">Logout</button>
      </ng-container>
      <ng-template #authButtons>
        <button mat-button routerLink="/login">Login</button>
        <button mat-button routerLink="/register">Register</button>
      </ng-template>
    </mat-toolbar>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    main {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    mat-toolbar {
      button {
        margin-left: 8px;
      }
      span {
        margin-right: 8px;
      }
    }
  `]
})
export class AppComponent {
  isAuthenticated$ = this.store.select(selectIsAuthenticated);
  user$ = this.store.select(selectUser);

  constructor(private store: Store) {}

  onLogout() {
    this.store.dispatch(logout());
  }
}
