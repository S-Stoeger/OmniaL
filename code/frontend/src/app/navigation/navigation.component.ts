import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { MatBadge } from '@angular/material/badge';
import { LocalStorageService } from '../local-storage.service';
import { NgIf } from '@angular/common';
import { logout } from '../../main';
import { UserService } from '../user.service';
import { Person } from '../interfaces';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-navigation',
  imports: [
    RouterLink,
    MatBadge,
    NgIf,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  localStorageService: LocalStorageService = inject(LocalStorageService);
  userService: UserService = inject(UserService);
  httpService: HttpService = inject(HttpService);
  badgeCount: number = 0;
  user?: Person;

  constructor() {
    this.localStorageService.badgeCount.subscribe((count: number) => {
      this.badgeCount = count;
    });

    this.userService.user$.subscribe(person => {
      this.user = person ?? undefined;
      console.log('Navigation updated user:', this.user?.firstname);
    });
  }

  ngOnInit() {
    this.localStorageService.getStorageItemCount();
  }

  protected readonly logout = logout;
}
