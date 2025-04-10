import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audio = new Audio();

  playAudio(src: string) {
    if (this.audio.src !== src) {
      this.audio.src = src;
    }
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  stopAudio() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}
