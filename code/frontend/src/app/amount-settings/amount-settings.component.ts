import {Component, inject, Input, OnInit} from '@angular/core';
import {LocalStorageService} from '../local-storage.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-amount-settings',
  imports: [
    NgIf
  ],
  templateUrl: './amount-settings.component.html',
  styleUrl: './amount-settings.component.css'
})
export class AmountSettingsComponent implements OnInit {
  localStorageService: LocalStorageService = inject(LocalStorageService);
  @Input() maxAmount: number | undefined;
  @Input() chosenAmount : number | undefined;
  amount: number = 1;

  ngOnInit(): void {
    if (this.chosenAmount != undefined) {
      this.amount = this.chosenAmount;
    }
  }

  getCurrentAmount() {
    return this.amount;
  }
}
