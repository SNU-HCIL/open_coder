import { Component, OnInit } from '@angular/core';
import { FileOpenComponent } from './file-open.component';
import { CoderComponent } from './ui/coder.component';
import { OcDocument } from './core/oc-document';
import { AuthService} from './services/auth.service';

@Component({
  selector: 'oc-app',
  templateUrl: 'app/app.html',
  directives: [FileOpenComponent, CoderComponent],
  
})
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