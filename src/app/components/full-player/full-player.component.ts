import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-full-player',
  templateUrl: './full-player.component.html',
  styleUrls: ['./full-player.component.scss']
})
export class FullPlayerComponent {
  @Input() track: { title: string, artist: string, duration: number } = { title: 'Track Title', artist: 'Artist Name', duration: 180 };
  @Input() isPlaying: boolean = false;
  @Output() close = new EventEmitter<void>();

  currentTime: number = 0;
  volume: number = 1;

  togglePlay() {
    this.isPlaying = !this.isPlaying;
  }

  skip(seconds: number) {
    this.currentTime = Math.max(0, Math.min(this.track.duration, this.currentTime + seconds));  }
  }

  setVolume(value: number) {
    this.volume = value;
  }

  onTimeUpdate(event: any) {
    this.currentTime = event.target.value;
  }

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  closePlayer() {
    this.close.emit();
  }
}