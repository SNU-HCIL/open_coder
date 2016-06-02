import { Component, Input } from '@angular/core';
import { Document } from '../core/document';

@Component({
  selector: 'oc-code-summary',
  styleUrls: ['app/ui/code-summary.css'],
  templateUrl: 'app/ui/code-summary.html',
  directives: []
})
export class CodeSummaryComponent {
    @Input() doc : Document;
    
}