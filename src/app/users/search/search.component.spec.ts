import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../users.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

class MockUsersService {
  fetchUserDataWithOfflineCheck(username: string) {
    return of({ login: username } as any);
  }

  submitUser(user: any) { }
}

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let usersService: MockUsersService;
  let router: Router;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot()
      ],
      declarations: [SearchComponent, LoadingSpinnerComponent],
      providers: [
        { provide: UsersService, useClass: MockUsersService },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    usersService = TestBed.inject(UsersService);
    router = TestBed.inject(Router);
    translateService = TestBed.inject(TranslateService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the component correctly', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('users.app-name');
    expect(compiled.querySelector('input[formControlName="username"]')).toBeTruthy();
    expect(compiled.querySelector('button[type="submit"]')).toBeTruthy();
  });

  it('should call searchForUser and navigate on success', () => {
    const username = 'testuser';
    component.form.controls['username'].setValue(username);

    spyOn(component, 'searchForUser').and.callThrough();

    component.searchForUser();

    expect(component.searchForUser).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/user/', username]);
  });

  it('should show modal when user not found', () => {
    const username = 'invaliduser';
    component.form.controls['username'].setValue(username);

    spyOn(usersService, 'fetchUserDataWithOfflineCheck').and.returnValue(throwError('User not found'));

    component.searchForUser();

    expect(component.showUserNotFound).toBe(true);
  });

  it('should hide modal on closeModal', () => {
    component.showUserNotFound = true;
    component.closeModal();
    expect(component.showUserNotFound).toBe(false);
  });

  it('should reset form on modal close', () => {
    component.form.controls['username'].setValue('testuser');
    component.showUserNotFound = true;
    component.closeModal();
    expect(component.form.value.username).toBeNull();
  });

  it('should show invalid username message when pattern error is present', () => {
    component.form.controls['username'].setValue('invalid@username');
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('.invalid-search')).nativeElement;
    expect(errorMessage.textContent).toContain('users.search-invalid-username');
  });

  it('should disable submit button if form is invalid', () => {
    component.form.controls['username'].setValue('..  ..');
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(submitButton.disabled).toBeTruthy();
  });

  it('should enable submit button if form is valid', () => {
    component.form.controls['username'].setValue('validusername');
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(submitButton.disabled).toBeFalsy();
  });
});
