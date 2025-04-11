import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioBarComponent } from '../audio-bar/audio-bar.component';

interface AudioFile {
  title: string;
  src: string;
}

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, AudioBarComponent],
  template: `
    <div class="search-results" *ngIf="isVisible">
      <div class="results-container">
        <h3>Search Results</h3>
        <div class="results-list" *ngIf="filteredSongs.length > 0">
          <div class="audio-item" *ngFor="let song of filteredSongs">
            <app-audio-bar [audio]="song" [title]="song.title"></app-audio-bar>
          </div>
        </div>
        <div class="no-results" *ngIf="filteredSongs.length === 0">
          No songs found matching "{{ searchQuery }}"
        </div>
      </div>
    </div>
  `,
  styles: [`
    .search-results {
      position: fixed;
      top: 64px;
      left: 0;
      right: 0;
      background: var(--bg-color);
      z-index: 999;
      padding: 1rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      max-height: 70vh;
      overflow-y: auto;
    }

    .results-container {
      max-width: 800px;
      margin: 0 auto;
    }

    h3 {
      margin: 0 0 1rem;
      color: var(--text-color);
      font-size: 1.2rem;
    }

    .results-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .audio-item {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      transition: transform 0.2s ease;

      &:hover {
        transform: translateX(4px);
      }
    }

    .no-results {
      text-align: center;
      padding: 2rem;
      color: var(--text-color);
      opacity: 0.7;
    }

    @media (max-width: 768px) {
      .search-results {
        top: 56px;
        padding: 0.75rem;
      }
    }

    @media (max-width: 480px) {
      .search-results {
        top: 88px;
        padding: 0.5rem;
      }

      h3 {
        font-size: 1.1rem;
      }
    }
  `]
})
export class SearchResultsComponent {
  @Input() isVisible: boolean = false;
  @Input() searchQuery: string = '';
  @Input() filteredSongs: AudioFile[] = [];
} 