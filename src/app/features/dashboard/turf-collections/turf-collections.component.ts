import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-turf-collections',
  imports: [CommonModule, MatCardModule],
  templateUrl: './turf-collections.component.html',
  styleUrl: './turf-collections.component.css'
})
export class TurfCollectionsComponent {
  turfs = [
    {
      id:'1',
      name: 'Football Turf',
      description: 'Perfect for 5-a-side games. Book your slot today!',
      price: '$50 per hour',
      image: 'assets/images/img7.jpg',
    },
    {
      id:'2',
      name: 'Cricket Turf',
      description: 'Ideal for cricket games with your friends or team.',
      price: '$60 per hour',
      image: 'assets/images/img5.jpg',
    },
    {
      id:'3',
      name: 'Indoor Turf',
      description: 'A great place for indoor football or futsal.',
      price: '$40 per hour',
      image: 'assets/images/img8.jpg',
    },
    {
      id:'1',
      name: 'Football Turf',
      description: 'Perfect for 5-a-side games. Book your slot today!',
      price: '$50 per hour',
      image: 'assets/images/img7.jpg',
    },
    {
      id:'2',
      name: 'Cricket Turf',
      description: 'Ideal for cricket games with your friends or team.',
      price: '$60 per hour',
      image: 'assets/images/img5.jpg',
    },
    {
      id:'3',
      name: 'Indoor Turf',
      description: 'A great place for indoor football or futsal.',
      price: '$40 per hour',
      image: 'assets/images/img8.jpg',
    }
    // Add more turfs as needed
  ];
}