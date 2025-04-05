import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { DBConfig, provideIndexedDb } from 'ngx-indexed-db';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './i18n/', '.json');

const dbConfig: DBConfig  = {
  name: 'SearchEngineDB',
  version: 1,
  objectStoresMeta: [{
    store: 'users',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'login', keypath: 'login', options: { unique: false } }
    ]
  }]
};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideHttpClient(),
  provideIndexedDb(dbConfig),
  importProvidersFrom([TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: httpLoaderFactory,
      deps: [HttpClient],
    },
  })])
  ],
};
