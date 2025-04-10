import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mini-player',
  templateUrl: './mini-player.component.html',
  styleUrls: ['./mini-player.component.scss'],
})
export class MiniPlayerComponent {
  @Input() track: { title: string, artist: string } | null = null;
  @Output() openFullPlayerEvent = new EventEmitter<void>();

  isPlaying = false;

  togglePlay() {
    this.isPlaying = !this.isPlaying;
  }

  openFullPlayer() {
    this.openFullPlayerEvent.emit();
  }
}