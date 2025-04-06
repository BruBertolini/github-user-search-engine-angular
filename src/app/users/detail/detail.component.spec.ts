import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailComponent } from './detail.component';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';
import { of, BehaviorSubject } from 'rxjs';
import { IRepo } from '../../models/repo';
import { IUser } from '../../models/user';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let mockUsersService: jasmine.SpyObj<UsersService>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;

  const mockUser = {
    login: 'testUser',
    name: 'Test User',
    avatar_url: 'https://avatar.url',
    bio: 'Test bio',
    followers: 10,
    following: 5,
    location: 'Test Location',
    repositories: [
      { name: 'repo1', stargazers_count: '5' } as IRepo,
      { name: 'repo2', stargazers_count: '10' } as IRepo,
    ],
  } as IUser;

  beforeEach(async () => {
    // Mock do UsersService
    mockUsersService = jasmine.createSpyObj('UsersService', ['user$', 'fetchUserDataWithOfflineCheck', 'submitUser']);
    
    // Usando BehaviorSubject para simular o user$
    const userSubject = new BehaviorSubject<IUser | null>(null);
    mockUsersService.user$ = userSubject.asObservable();

    // Mock do ActivatedRoute
    mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', ['params']);
    
    await TestBed.configureTestingModule({
      declarations: [DetailComponent],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
      schemas: [NO_ERRORS_SCHEMA],  // Ignora erros de templates não resolvidos
    }).compileComponents();

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should filter repositories by name', () => {
    component.userData = mockUser;
    component.filterRepos('repo1');

    expect(component.filteredRepositories.length).toBe(1);
    expect(component.filteredRepositories[0].name).toBe('repo1');
  });

  it('should return empty list when no repositories match filter', () => {
    component.userData = mockUser;
    component.filterRepos('repo3');

    expect(component.filteredRepositories.length).toBe(0);
  });

});
