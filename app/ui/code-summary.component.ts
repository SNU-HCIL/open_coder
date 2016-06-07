import { Component, Input } from '@angular/core';
import {TitleComponent} from './common/title.component';
import { Document } from '../core/document';


@Component({
  selector: 'oc-code-summary',
  styleUrls: ['app/ui/code-summary.css'],
  templateUrl: 'app/ui/code-summary.html',
  directives: [TitleComponent]
})
export class CodeSummaryComponent {
    @Input() doc : Document;
    
    onHover(code: string){
      console.log(this.doc.quotesByCode(code));
    }
}