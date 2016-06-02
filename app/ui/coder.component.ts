import { Component, Input } from '@angular/core';
import { QuoteEditingComponent } from './quote-editing.component';
import { Document } from '../core/document';

@Component({
  selector: 'oc-coder',
  styleUrls: ['app/ui/coder.styles.css'],
  templateUrl: 'app/ui/coder.html',
  directives: [QuoteEditingComponent]
})
export class CoderComponent {
    @Input() doc : Document;
}