import {Component, inject, OnInit, ViewEncapsulation} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatBadge} from '@angular/material/badge';
import {LocalStorageService} from '../local-storage.service';
import {NgIf} from '@angular/common';
import {logout} from '../../main';
import {UserService} from '../user.service';
import {Person} from '../interfaces';

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
  localStorageService: LocalStorageService = inject(LocalStorageService);
  userService: UserService = inject(UserService);
  badgeCount: number = 0;
  user: Person;

  constructor() {
    this.localStorageService.badgeCount.subscribe((count: number) => {
      this.badgeCount = count;
    })

    this.user = this.userService.getUser();
  }

  ngOnInit() {
    this.localStorageService.getStorageItemCount()
  }

  protected readonly logout = logout;
}
