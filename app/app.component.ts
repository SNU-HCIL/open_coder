import { Component } from '@angular/core';
import { FileOpenComponent } from './file-open.component';


@Component({
  selector: 'oc-app',
  templateUrl: 'app/app.html',
  directives: [FileOpenComponent]
})
export class AppComponent { }