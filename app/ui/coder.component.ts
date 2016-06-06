import { Component, Input } from '@angular/core';
import { QuoteEditingComponent } from './quote-editing.component';
import { CodeSummaryComponent} from './code-summary.component';
import { MemoListComponent } from './memo-list.component';
import {TitleComponent} from './common/title.component';
import {VisualizationInformationService} from './visualization-information.service';
import { Document } from '../core/document';

@Component({
  selector: 'oc-coder',
  styleUrls: ['app/ui/coder.styles.css'],
  templateUrl: 'app/ui/coder.html',
  directives: [QuoteEditingComponent, CodeSummaryComponent, MemoListComponent, TitleComponent],
  providers: [VisualizationInformationService]
})
export class CoderComponent {
    @Input() doc : Document;
    
    isLnbExpanded :boolean = false;
    
    constructor(private visualizationInformationService: VisualizationInformationService){
      
    }
    
    onSaveButtonClicked(){
      console.log(this.doc.toCsvString());
    }
    
    expandLnb(){
      this.isLnbExpanded = true;
    }
    
    collapseLnb(){
      this.isLnbExpanded = false;
    }
    
    toggleLnb(){
      if(!this.isLnbExpanded)
      {
        this.expandLnb();
      }
      else{
        this.collapseLnb();
      }
    }
}