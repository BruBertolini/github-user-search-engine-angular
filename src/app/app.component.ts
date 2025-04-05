import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConnectionStatusService } from './shared/services/connection-status.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  public appIsOffline: boolean = false;

  constructor(
    private translate: TranslateService,
    private connStatusService: ConnectionStatusService
  ) {
    this.translate.addLangs(['en', 'pt']);
    this.translate.setDefaultLang('pt');
    this.translate.use('pt');

    this.connStatusService.appIsOnline$
      .subscribe(x => { this.appIsOffline = x })
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }

  getCurrLang(): string {
    return this.translate.currentLang;
  }
}
