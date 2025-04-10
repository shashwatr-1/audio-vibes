import { CommonModule } from '@angular/common';
import { Component, Input, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-audio-bar',
  imports:[CommonModule],
  standalone:true,
  templateUrl: './audio-bar.component.html',
  styleUrls: ['./audio-bar.component.scss']
})
export class AudioBarComponent implements OnInit, OnDestroy {
  @Input() audio: { title: string; src: string } = { title: '', src: '' };
  @Input() title!: string;
  
  @ViewChild('waveform', { static: true }) waveformRef!: ElementRef;

  wave!: WaveSurfer;
  isPlaying = false;
  isMuted = false;
  volume = 0.5;
  currentTime = 0;
  duration = 0;

  ngOnInit(): void {
    this.wave = WaveSurfer.create({
      container: this.waveformRef.nativeElement,
      waveColor: '#a0c4ff',
      progressColor: '#4361ee',
      height: 60,
    });

    this.wave.load(this.audio.src);

    this.wave.on('ready', () => {
      this.duration = this.wave.getDuration();
    });

    this.wave.on('audioprocess', () => {
      this.currentTime = this.wave.getCurrentTime();
    });

    this.wave.on('finish', () => {
      this.isPlaying = false;
      this.currentTime = 0;
    });

    this.wave.setVolume(this.volume);
  }

  togglePlay() {
    this.wave.playPause();
    this.isPlaying = this.wave.isPlaying();
  }

  seek(event: Event) {
    const val = parseFloat((event.target as HTMLInputElement).value);
    this.wave.seekTo(val / this.duration);
    this.currentTime = val;
  }

  changeVolume(event: Event) {
    const vol = parseFloat((event.target as HTMLInputElement).value);
    this.wave.setVolume(vol);
    this.volume = vol;
    this.isMuted = vol === 0;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.wave.setVolume(this.isMuted ? 0 : this.volume);
  }

  ngOnDestroy(): void {
    this.wave.destroy();
  }
}
