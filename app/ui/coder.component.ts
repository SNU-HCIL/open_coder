import { Component, Input } from '@angular/core';
import { QuoteEditingComponent } from './quote-editing.component';
import { CodeSummaryComponent} from './code-summary.component';
import { Document } from '../core/document';

@Component({
  selector: 'oc-coder',
  styleUrls: ['app/ui/coder.styles.css'],
  templateUrl: 'app/ui/coder.html',
  directives: [QuoteEditingComponent, CodeSummaryComponent]
})
export class CoderComponent {
    @Input() doc : Document;
}