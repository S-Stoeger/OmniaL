import { Injectable, OnDestroy, inject } from '@angular/core';
import { Person } from './interfaces';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private http: HttpClient = inject(HttpClient);
  private URL: string = 'https://it200281.cloud.htl-leonding.ac.at/api/';

  // BehaviorSubject to track current user
  private userSubject = new BehaviorSubject<Person | null>(null);
  user$ = this.userSubject.asObservable(); // Observable that components can subscribe to

  // Track previous user ID for detecting user changes
  private previousUserId: number | null = null;

  // Event listener for auth changes
  private authEventListener: any;

  constructor() {
    // Initialize from localStorage on service creation
    const token = localStorage.getItem('token');
    if (token) {
      this.refreshUserData(token);
    }

    // Listen for auth state changes
    this.authEventListener = this.handleAuthStateChange.bind(this);
    window.addEventListener('auth-state-changed', this.authEventListener);
  }

  ngOnDestroy() {
    // Clean up event listener
    if (this.authEventListener) {
      window.removeEventListener('auth-state-changed', this.authEventListener);
    }
  }

  // Handle auth state changes from outside Angular
  private handleAuthStateChange(event: any) {
    const token = event.detail?.token;
    console.log('Auth state changed event received:', token ? 'Token present' : 'No token');
    this.refreshUserData(token || '');
  }

  // Get current user synchronously (if needed)
  getUser(): Person | null {
    return this.userSubject.value;
  }

  // Method to refresh user data with a token
  refreshUserData(token: string): void {
    if (!token) {
      // If no token provided, clear the user
      this.previousUserId = this.userSubject.value?.id || null;
      this.userSubject.next(null);
      return;
    }

    this.getPersonByToken(token).subscribe({
      next: (person) => {
        // Check if this is a different user than the previous one
        const isNewUser = this.previousUserId !== null && this.previousUserId !== person.id;
        if (isNewUser) {
          console.log('New user logged in:', person.firstname);
          // You could trigger specific actions for new user login here
        }

        // Update user information
        this.previousUserId = person.id;
        this.userSubject.next(person);
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
        this.userSubject.next(null);
      }
    });
  }

  // Get person data by token from API
  getPersonByToken(token: string): Observable<Person> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Person>(`${this.URL}persons/token`, { headers });
  }
}
