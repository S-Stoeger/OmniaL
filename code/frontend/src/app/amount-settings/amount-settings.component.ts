import {Component, inject, Input} from '@angular/core';
import {LocalStorageService} from '../local-storage.service';

@Component({
  selector: 'app-amount-settings',
  imports: [],
  templateUrl: './amount-settings.component.html',
  styleUrl: './amount-settings.component.css'
})
export class AmountSettingsComponent {
  localStorageService: LocalStorageService = inject(LocalStorageService);
  @Input() maxAmount: number | undefined;
  amount: number = 1;

  getCurrentAmount() {
    return this.amount;
  }
}
