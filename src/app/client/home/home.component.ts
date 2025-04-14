import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ngOnInit() {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-in-out'
    });

    // Initialize video autoplay
    const video = document.querySelector('.hero-background') as HTMLVideoElement;
    if (video) {
      video.play().catch(error => {
        console.warn('Video autoplay failed:', error);
      });
    }
  }
}