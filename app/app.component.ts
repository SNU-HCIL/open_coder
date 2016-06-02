import { Component } from '@angular/core';
import { FileOpenComponent } from './file-open.component';
import { CoderComponent } from './ui/coder.component';
import { Document } from './core/document';


@Component({
  selector: 'oc-app',
  templateUrl: 'app/app.html',
  directives: [FileOpenComponent, CoderComponent]
})
export class AppComponent { 
    doc : Document;
    
    onDocumentOpened(document: Document){
      this.doc = document;
      console.log(document);
    }
}