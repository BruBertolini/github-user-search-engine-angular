import { Component, Input } from '@angular/core';

@Component({
  selector: 'util-loading-spinner',
  standalone: false,
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent {

  @Input() spinnerSize: 'small' | 'medium' | 'large' = 'large'
  @Input() overlay: boolean = true;
}
