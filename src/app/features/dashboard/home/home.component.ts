import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { Observable } from 'rxjs';
import { loadHome } from './store/home.actions';
import { selectHomeData } from './store/home.selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,SlickCarouselModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  posts$: Observable<any[]>; // Observable to hold posts
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(private store: Store) {
    this.posts$ = this.store.select(selectHomeData); // Select posts from the store
  }

  ngOnInit() {
    this.store.dispatch(loadHome());
  }
  ngAfterViewInit() {
    // this.updateScrollIndicator();
  }

  // Data for the swiper slides
  slides = [
    { image: 'assets/images/img7.jpg', alt: 'Slide 1' },
    { image: 'assets/images/img6.jpg', alt: 'Slide 2' },
    { image: 'assets/images/img8.jpg', alt: 'Slide 3' },
  ];


  // Data for available turfs
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

  // Data for testimonials
  testimonials = [
    {
      name: 'John Doe',
      feedback: 'Great experience! The turf was well-maintained and easy to book. Highly recommend!',
      image: 'assets/images/user1.jpg',
    },
    {
      name: 'Jane Smith',
      feedback: 'Had a fantastic time! Quick booking process and the facilities were top-notch.',
      image: 'assets/images/user2.jpg',
    },
    // Add more testimonials as needed
  ];

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }
  
  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }
}
