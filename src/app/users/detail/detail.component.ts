import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, take } from 'rxjs';
import { UsersService } from '../users.service';
import { IRepo } from '../../models/repo';
import { IUser } from '../../models/user';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  standalone: false
})
export class DetailComponent {

  public loading = false;
  public userData: any;
  public filteredRepositories: Array<IRepo> = [];
  private ascDescControl = 'desc'

  constructor(private service: UsersService, private activatedRoute: ActivatedRoute) {
    this.service.user$
      .subscribe(data => {
        if (data == null) {
          this.getUserFromRoute();
        } else {
          this.userData = data;
          this.filteredRepositories = this.order('asc', 'name', this.userData.repositories);
        }
      })
  }

  private getUserFromRoute(): void {
    this.loading = true;
    this.activatedRoute.params
      .subscribe(params => {
        if (params['userName']) {
          this.getUserData(params['userName']);
        }
      });
  }

  private getUserData(username: string): void {
    this.service.fetchUserDataWithOfflineCheck(username)
      .pipe(take(1))
      .subscribe({
        next: (user) => {
          this.userData = user;
          this.filteredRepositories = this.order('asc', 'name', this.userData.repositories);
          this.loading = false;
        }
      });
  }

  filterRepos(repoName: string) {
    this.filteredRepositories = this.userData.repositories
      .filter((x: IRepo) => x.name.toLowerCase().includes(repoName.toLowerCase()))
  }

  orderRepositories(field: 'name' | 'stargazers_count'): void {
    if (this.ascDescControl != 'asc') {
      this.ascDescControl = 'asc';
      this.filteredRepositories = this.order('desc', field, this.userData.repositories);
      return;
    }

    this.ascDescControl = 'desc';
    this.filteredRepositories = this.order('asc', field, this.userData.repositories);
  }

  private order(order: 'asc' | 'desc', field: string, list: Array<IRepo>): Array<IRepo> {
    if (order === 'asc') {
      return list.sort((x: any, y: any) =>
        y[field].toString().localeCompare(x[field].toString()));
    } else {
      return list.sort((x: IRepo, y: IRepo) =>
        x[field as keyof IRepo].toString().localeCompare(y[field as keyof IRepo].toString()));
    }
  }


}
