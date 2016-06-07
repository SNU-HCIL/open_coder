import { Component } from '@angular/core';
import { FileOpenComponent } from './file-open.component';
import { CoderComponent } from './ui/coder.component';
import { OcDocument } from './core/oc-document';


@Component({
  selector: 'oc-app',
  templateUrl: 'app/app.html',
  directives: [FileOpenComponent, CoderComponent]
})
export class AppComponent { 
    doc : OcDocument;
    
    onDocumentOpened(document: OcDocument){
      this.doc = document;
      console.log(document);
    }
}