import { Component, HostBinding } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, MatSlideToggleModule, RouterOutlet, CommonModule],
  template: `
    <mat-toolbar color="primary">
      <span>🎧 SAX SUX KI BAATEIN WITH PLAYBOI- SHIVAM</span>
      <span class="spacer"></span>
      <mat-slide-toggle (change)="toggleDarkMode($event.checked)">
        Toggle to {{ currentTheme === 'Dark' ? 'Light' : 'Dark' }} Mode
      </mat-slide-toggle>
    </mat-toolbar>

    <router-outlet></router-outlet>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background-color: var(--bg-color);
      color: var(--text-color);
      transition: background-color 0.3s, color 0.3s;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .dark-theme {
      --bg-color: #121212;
      --text-color: #ffffff;
    }

    :host(:not(.dark-theme)) {
      --bg-color: #ffffff;
      --text-color: #000000;
    }
  `]
})
export class AppComponent {
  @HostBinding('class') className = '';
  currentTheme: 'Light' | 'Dark' = 'Light';

  toggleDarkMode(isDark: boolean) {
    this.className = isDark ? 'dark-theme' : '';
    this.currentTheme = isDark ? 'Dark' : 'Light';
  }
}
