import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoiceAssistantService {
  private isListening = false;
  private commandSubject = new Subject<string>();
  command$ = this.commandSubject.asObservable(); // Observable for components to subscribe to

  private recognition: SpeechRecognition | undefined;
  private synthesis: SpeechSynthesis | undefined;

  constructor() {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      this.recognition = new ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)();
      this.recognition.lang = 'en-US'; // Set language
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;

      this.recognition.onresult = (event: SpeechRecognitionEvent) => {
        const command = event.results[0][0].transcript.toLowerCase();
        this.processCommand(command);
      };

      this.recognition.onend = () => {
        if (this.isListening) {
          this.listen(); // Restart listening if it was interrupted
        }
      };

      this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        this.speak('Sorry, I encountered an error with speech recognition.');
        this.stopListening(); // Stop listening on error
      };
    } else {
      console.error('SpeechRecognition API not supported in this browser.');
      this.speak('Sorry, voice commands are not supported in this browser.');
    }

    if ('speechSynthesis' in window) {
      this.synthesis = window.speechSynthesis;
    } else {
      console.error('SpeechSynthesis API not supported in this browser.');
      // Text-to-speech will not be available
    }
  }

  listen(): void {
    if (this.recognition && !this.isListening) {
      this.isListening = true;
      console.log('Voice assistant listening...');
      try {
        this.recognition.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        this.speak('Sorry, I could not start listening for voice commands.');
        this.stopListening();
      }
    }
  }

  stopListening(): void {
    if (this.recognition && this.isListening) {
      this.isListening = false;
      console.log('Voice assistant stopped listening.');
      this.recognition.stop();
    }
  }

  processCommand(command: string): void {
    console.log('Processing command:', command);
    this.commandSubject.next(command); // Emit the command
  }

  speak(text: string): void {
    if (this.synthesis) {
      console.log('Speaking:', text);
      const utterance = new SpeechSynthesisUtterance(text);
      // You can customize utterance properties here, e.g., voice, rate, pitch
      this.synthesis.speak(utterance);
    } else {
      console.warn('Speech synthesis is not available.');
      // Optionally, display the text on the screen as a fallback
    }
  }
}