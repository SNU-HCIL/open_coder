import { Component, OnInit } from '@angular/core';
import { RouteConfig, RouterOutlet } from '@angular/router-deprecated';
import { LoginRouterOutlet } from './login.router-outlet';

import { LoginComponent} from './ui/login.component';
import { DashboardComponent } from './ui/dashboard.component';
import { CoderComponent } from './ui/coder.component';
import { OcDocument } from './core/oc-document';
import { AuthService} from './services/auth.service';

@Component({
  selector: 'oc-app',
  templateUrl: 'app/app.html',
  directives: [LoginRouterOutlet],
  
})

@RouteConfig([
  {path: '/', redirectTo: ['Dashboard']},
  {path: '/dashboard', component: DashboardComponent, name:"Dashboard", useAsDefault: true},
  {path: '/login', component: LoginComponent, name:"Login"},
  {path: '/coder', component:CoderComponent, name:"Coder"}
])

export class AppComponent implements OnInit { 
    doc : OcDocument;
    
    constructor(private authService: AuthService)
    {/*
      authService.signIn("yhkim@hcil.snu.ac.kr", "HCIL4ever").then(result=> 
      {
        console.log(result)
        authService.signOut().then(result=> console.log(result))
      })*/
    }
    
    onDocumentOpened(document: OcDocument){
      this.doc = document;
      console.log(document);
    }
    
    ngOnInit(){
    }
}