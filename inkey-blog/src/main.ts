/// <reference types="@angular/localize" />

import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import {routes} from './app/app.routes';

bootstrapApplication(AppComponent, {providers:[provideRouter(routes),
  provideProtractorTestingSupport(),
]})
  .catch((err) => console.error(err));
