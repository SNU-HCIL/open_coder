import { bootstrap }      from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent } from './app.component';

import {AuthService} from './services/auth.service';

bootstrap(AppComponent, [
  AuthService,
  HTTP_PROVIDERS
]);