import { Component, HostBinding } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { SearchResultsComponent } from './components/search-results/search-results.component';

interface AudioFile {
  title: string;
  src: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule, 
    MatSlideToggleModule, 
    RouterOutlet, 
    CommonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    SearchResultsComponent
  ],
  template: `
    <mat-toolbar [class.dark-theme]="currentTheme === 'Dark'" class="navbar">
      <div class="navbar-content">
        <div class="title-container">
          <span class="title">🎧 SAX SUX KI BAATEIN WITH PLAYBOI- SHIVAM</span>
        </div>
        <div class="search-container">
          <input 
            type="text" 
            [(ngModel)]="searchQuery" 
            (input)="onSearch()"
            placeholder="search sax sux audio"
            class="search-input"
          >
          <mat-icon class="search-icon">search</mat-icon>
        </div>
        <div class="theme-toggle-container">
          <mat-slide-toggle (change)="toggleDarkMode($event.checked)">
            {{ currentTheme === 'Dark' ? 'Light' : 'Dark' }}
          </mat-slide-toggle>
        </div>
      </div>
    </mat-toolbar>

    <app-search-results
      [isVisible]="showSearchResults"
      [searchQuery]="searchQuery"
      [filteredSongs]="filteredSongs"
    ></app-search-results>

    <main class="main-content" [class.has-search-results]="showSearchResults">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background-color: var(--bg-color);
      color: var(--text-color);
      transition: background-color 0.3s, color 0.3s;
      overflow-x: hidden;
      width: 100%;
      max-width: 100vw;
    }

    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      padding: 0.5rem 1rem;
      transition: all 0.3s ease;
      background-color: #f5f5f5;
      color: #333;
      height: auto;
      min-height: 64px;

      &.dark-theme {
        background-color: #1a1a1a;
        color: #fff;
      }
    }

    .navbar-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .title-container {
      flex: 1;
      min-width: 200px;
      max-width: 400px;
    }

    .title {
      font-size: 1rem;
      line-height: 1.2;
      white-space: normal;
      word-wrap: break-word;
      display: block;
    }

    .search-container {
      position: relative;
      flex: 2;
      min-width: 200px;
      max-width: 400px;
      margin: 0 1rem;
    }

    .search-input {
      width: 100%;
      padding: 0.5rem 2.5rem 0.5rem 1rem;
      border: none;
      border-radius: 20px;
      background: rgba(0, 0, 0, 0.05);
      color: inherit;
      font-size: 0.9rem;
      backdrop-filter: blur(5px);
      border: 1px solid rgba(0, 0, 0, 0.1);

      &::placeholder {
        color: inherit;
        opacity: 0.7;
      }

      &:focus {
        outline: none;
        background: rgba(0, 0, 0, 0.08);
        border-color: rgba(0, 0, 0, 0.2);
        box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
      }
    }

    .search-icon {
      position: absolute;
      right: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      opacity: 0.7;
    }

    .theme-toggle-container {
      flex: 0 0 auto;
      min-width: 100px;
      display: flex;
      justify-content: flex-end;
    }

    .main-content {
      margin-top: 64px;
      padding: 1rem;
      transition: margin-top 0.3s ease;

      &.has-search-results {
        margin-top: calc(64px + 70vh);
      }
    }

    .dark-theme {
      --bg-color: #121212;
      --text-color: #ffffff;
      .search-input {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);

        &:focus {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
        }
      }
    }

    :host(:not(.dark-theme)) {
      --bg-color: #ffffff;
      --text-color: #000000;
    }

    @media (max-width: 768px) {
      .navbar {
        padding: 0.5rem;
        height: auto;
      }

      .navbar-content {
        gap: 0.5rem;
      }

      .title {
        font-size: 0.9rem;
      }

      .search-container {
        margin: 0.5rem 0;
        order: 3;
        width: 100%;
        max-width: none;
      }

      .theme-toggle-container {
        order: 2;
      }
    }

    @media (max-width: 480px) {
      .navbar {
        padding: 0.5rem;
      }

      .navbar-content {
        flex-direction: column;
        align-items: stretch;
      }

      .title-container {
        width: 100%;
        max-width: none;
        text-align: center;
      }

      .search-container {
        margin: 0.5rem 0;
      }

      .theme-toggle-container {
        width: 100%;
        justify-content: center;
      }

      .main-content {
        margin-top: 120px;

        &.has-search-results {
          margin-top: calc(120px + 70vh);
        }
      }
    }
  `]
})
export class AppComponent {
  @HostBinding('class') className = '';
  currentTheme: 'Light' | 'Dark' = 'Light';
  searchQuery: string = '';
  showSearchResults: boolean = false;
  filteredSongs: AudioFile[] = [];

  // Sample audio files (in a real app, this would come from a service)
  audioFiles: AudioFile[] = [
    { title: 'Lo-fi Chill', src: 'assets/videos/u.mp3' },
    { title: 'Ambient Dream', src: 'assets/videos/u.mp3' },
    { title: 'Relaxing Beats', src: 'assets/videos/u.mp3' },
    { title: 'Smooth Jazz', src: 'assets/videos/u.mp3' },
    { title: 'Mellow Mood', src: 'assets/videos/u.mp3' },
    { title: 'Tranquil Escape', src: 'assets/videos/u.mp3' },
    { title: 'Chillhop Vibes', src: 'assets/videos/u.mp3' },
    { title: 'Dreamy Atmosphere', src: 'assets/videos/u.mp3' },
    { title: 'Soothing Textures', src: 'assets/videos/u.mp3' },
    { title: 'Serene Flow', src: 'assets/videos/u.mp3' }
  ];

  toggleDarkMode(isDark: boolean) {
    this.className = isDark ? 'dark-theme' : '';
    this.currentTheme = isDark ? 'Dark' : 'Light';
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.showSearchResults = true;
      const query = this.searchQuery.toLowerCase();
      this.filteredSongs = this.audioFiles.filter(song => 
        song.title.toLowerCase().includes(query)
      );
    } else {
      this.showSearchResults = false;
      this.filteredSongs = [];
    }
  }
}
