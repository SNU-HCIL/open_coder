import { Component, Input } from '@angular/core';
import {TitleComponent} from './common/title.component';
import { OcDocument } from '../core/oc-document';


@Component({
  selector: 'oc-code-summary',
  styleUrls: ['app/ui/code-summary.css'],
  templateUrl: 'app/ui/code-summary.html',
  directives: [TitleComponent]
})
export class CodeSummaryComponent {
    @Input() doc : OcDocument;
    
    onHover(code: string){
      console.log(this.doc.quotesByCode(code));
    }
}