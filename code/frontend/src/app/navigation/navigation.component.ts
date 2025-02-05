import {Component, inject, OnInit, ViewEncapsulation} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatBadge} from '@angular/material/badge';
import {LocalStorageService} from '../local-storage.service';
import {NgIf} from '@angular/common';

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
  badgeCount: number = 0;

  constructor() {
    this.localStorageService.badgeCount.subscribe((count: number) => {
      this.badgeCount = count;
    })
  }

  ngOnInit() {
    this.localStorageService.getStorageItemCount()
  }

}
