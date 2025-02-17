import { AfterViewInit, Component } from '@angular/core';
import Swiper from 'swiper'; // Import Swiper
import 'swiper/css'; // Import default Swiper styles
import 'swiper/css/navigation'; // Import navigation styles
import 'swiper/css/pagination'; // Import pagination styles
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectHomeData } from './store/home.selectors';
import { loadHome } from './store/home.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent,
    FooterComponent,], // Import only the necessary Angular modules
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  posts$: Observable<any[]>; // Observable to hold posts

  constructor(private store: Store) {
    this.posts$ = this.store.select(selectHomeData); // Select posts from the store
  }

  ngOnInit() {
    console.log('Dispatching loadPosts action');
    this.store.dispatch(loadHome());
  }
  ngAfterViewInit() {
    // Initialize Swiper after the view is fully initialized
    new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: true,  // Enable navigation
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      loop: true,
    });
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
      name: 'Football Turf',
      description: 'Perfect for 5-a-side games. Book your slot today!',
      price: '$50 per hour',
      image: 'assets/images/img7.jpg',
    },
    {
      name: 'Cricket Turf',
      description: 'Ideal for cricket games with your friends or team.',
      price: '$60 per hour',
      image: 'assets/images/img5.jpg',
    },
    {
      name: 'Indoor Turf',
      description: 'A great place for indoor football or futsal.',
      price: '$40 per hour',
      image: 'assets/images/img8.jpg',
    },
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


}
