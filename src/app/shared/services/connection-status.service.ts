import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionStatusService {

  public appIsOnline$ = new BehaviorSubject<boolean>(window.navigator.onLine);
  constructor() {
    this.startListeners();
  }

  private startListeners() {
    window.addEventListener('online', () => this.appIsOnline$.next(true));
    window.addEventListener('offline', () => this.appIsOnline$.next(false));
  }
}
