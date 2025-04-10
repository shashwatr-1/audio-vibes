import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioBarComponent } from '../../components/audio-bar/audio-bar.component';
import { BackgroundComponent } from '../../components/background/background.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AudioBarComponent, SlickCarouselModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  {


    images = [
      'assets/images/a1.jpg',
      'assets/images/a2.jpg',
      'assets/images/a3.jpg',
      'assets/images/a4.JPG',
      'assets/images/one2many.jpg',
    ];
  
    slideConfig = {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,          
        autoplaySpeed: 3000,     
        infinite: true,            
        arrows: false,           
        dots: true,                
        pauseOnHover: false        
     
    }
  
  

  audioFiles = [
    { title: 'Lo-fi Chill', src: 'assets/videos/u.mp3' },
    { title: 'Ambient Dream', src: 'assets/videos/u.mp3' }
  ];

}