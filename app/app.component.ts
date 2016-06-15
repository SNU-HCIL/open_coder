import { Component, OnInit } from '@angular/core';
import { RouteConfig, RouterOutlet } from '@angular/router-deprecated';
import { LoginRouterOutlet } from './login.router-outlet';

import { TopBarComponent } from './ui/common/top-bar.component';
import { LoginComponent } from './auth.components';
import { DashboardComponent } from './dashboard.component';
import { ProjectPageComponent } from './project-page.component';
import { CoderComponent } from './coder/coder.component';

import { OcDocument } from './core/oc-document';
import { AuthService} from './services/auth.service';
import { DocumentSyncService} from './services/document-sync.service';

@Component({
  selector: 'oc-app',
  templateUrl: 'app/app.html',
  directives: [TopBarComponent, LoginRouterOutlet],
  
})

@RouteConfig([
  {path: '/', redirectTo: ['Dashboard']},
  {path: '/dashboard', component: DashboardComponent, name:"Dashboard", useAsDefault: true},
  {path: '/project/:id', component: ProjectPageComponent, name:"Project"},
  {path: '/login', component: LoginComponent, name:"Login"},
  {path: '/document/:id', component:CoderComponent, name:"Document"}
])

export class AppComponent implements OnInit { 
    doc : OcDocument;
    
    constructor(private authService: AuthService, private documentSyncService : DocumentSyncService)
    {/*
      authService.signIn("yhkim@hcil.snu.ac.kr", "HCIL4ever").then(result=> 
      {
        console.log(result)
        authService.signOut().then(result=> console.log(result))
      })*/
      
      this.documentSyncService.authService = this.authService;
    }
    
    onDocumentOpened(document: OcDocument){
      this.doc = document;
      console.log(document);
    }
    
    ngOnInit(){
    }
}