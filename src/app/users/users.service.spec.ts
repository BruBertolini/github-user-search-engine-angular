import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { DBConfig, provideIndexedDb } from 'ngx-indexed-db';

const dbConfig: DBConfig  = {
  name: 'SearchEngineDBTestes',
  version: 1,
  objectStoresMeta: [{
    store: 'users',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'login', keypath: 'login', options: { unique: false } }
    ]
  }]
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        provideHttpClient(),
        provideHttpClientTesting(),
         provideIndexedDb(dbConfig),
      ]
    });
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
