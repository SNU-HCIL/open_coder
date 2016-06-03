import { Component, Input } from '@angular/core';
import { QuoteEditingComponent } from './quote-editing.component';
import { CodeSummaryComponent} from './code-summary.component';
import {TitleComponent} from './common/title.component';
import {VisualizationInformationService} from './visualization-information.service';
import { Document } from '../core/document';

@Component({
  selector: 'oc-coder',
  styleUrls: ['app/ui/coder.styles.css'],
  templateUrl: 'app/ui/coder.html',
  directives: [QuoteEditingComponent, CodeSummaryComponent, TitleComponent],
  providers: [VisualizationInformationService]
})
export class CoderComponent {
    @Input() doc : Document;
    constructor(private visualizationInformationService: VisualizationInformationService){
      
    }
    
    onSaveButtonClicked(){
      console.log(this.doc.toCsvString());
    }
}