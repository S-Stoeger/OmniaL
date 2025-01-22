import {Component, ViewEncapsulation} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatBadge} from '@angular/material/badge';

@Component({
  selector: 'app-navigation',
  imports: [
    RouterLink,
    MatBadge
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',

})
export class NavigationComponent {

}
