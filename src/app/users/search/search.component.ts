import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { UsersService } from '../users.service';
import { IUser } from '../../models/user';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  standalone: false
})
export class SearchComponent {

  public form: FormGroup;
  public showUserNotFound: boolean = false;
  public loading: boolean = false;

  constructor(private service: UsersService, private router: Router) {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9_-]{1,39}$/)])
    });
  }

  public searchForUser() {
    this.loading = true;
    this.service.fetchUserDataWithOfflineCheck(this.form.getRawValue().username)
      .pipe(take(1))
      .subscribe({
        next: (userInfo: IUser) => {
          this.service.submitUser(userInfo);
          this.router.navigate(['/user/', userInfo.login]);
        },
        error: (_) => {
          this.showUserNotFound = true;
          this.loading = false;
        }
      });
  }

  @HostListener('document:keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.showUserNotFound) {
      this.closeModal();
    }
  }

  public closeModal() {
    this.showUserNotFound = false;
    this.form.reset();
  }
}
