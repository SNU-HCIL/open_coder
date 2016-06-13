import { bootstrap }      from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { AppComponent } from './app.component';

import {AuthService} from './services/auth.service';
import {DocumentSyncService} from './services/document-sync.service';

bootstrap(AppComponent, [
  AuthService,
  DocumentSyncService,
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS
]);