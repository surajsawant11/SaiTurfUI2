import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root', // This makes the service available throughout the app
})
export class HomeService {
    private apiUrl = 'https://api.example.com/posts'; // Replace with your API URL

    constructor(private http: HttpClient) {}

    getPosts(): Observable<any[]> {
        console.log('5454')
        return this.http.get<any[]>(this.apiUrl); // Fetch posts from the API
    }
} 