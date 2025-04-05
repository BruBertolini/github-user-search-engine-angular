import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, forkJoin, map, Observable, of, switchMap, take } from 'rxjs';
import { IUser } from '../models/user';
import { IRepo } from '../models/repo';
import { ConnectionStatusService } from '../shared/services/connection-status.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'https://api.github.com';

  private userSubject: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private connectionStatusService: ConnectionStatusService,
    private dbService: NgxIndexedDBService) { }

  submitUser(user: IUser): void {
    this.userSubject.next(user);
  }

  public fetchUserDataWithOfflineCheck(user: string): Observable<IUser> {
    return this.connectionStatusService.appIsOnline$.pipe(
      switchMap(isOnline => {
        if (isOnline) {
          return this.fetchUserData(user)
        } else {
          return this.getUserFromIndexedDB(user);
        }
      })
    );
  }

  public getUserFromIndexedDB(user: string): Observable<any> {
    return this.dbService.getByIndex('users', 'login', user)
      .pipe(map(x => {
        if (!x) {
          throw new Error('404');
        }
        return x;
      }))
  }

  private fetchUserData(user: string): Observable<IUser> {
    return forkJoin({
      user: this.http.get<IUser>(`${this.apiUrl}/users/${user}`),
      repos: this.http.get<Array<IRepo>>(`${this.apiUrl}/users/${user}/repos`)
    }).pipe(
      map((results) => {
        const user: IUser = results.user;
        user.repositories = results.repos;

        this.dbService.update('users', user)
        .pipe(take(1))
        .subscribe({
          next: () => console.log(`User ${user.login} saved to IndexedDB.`),
          error: (err) => console.error('Error saving user to IndexedDB:', err)
        });
        return user;
      })
    );
  }

}
