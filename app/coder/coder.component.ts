import { Component, Input } from '@angular/core';
import { QuoteEditingComponent } from './quote-editing.component';
import { CodeSummaryComponent} from './code-summary.component';
import { MemoListComponent } from './memo-list.component';
import {TitleComponent} from '../ui/common/title.component';
import {VisualizationInformationService} from '../services/visualization-information.service';
import { OcDocument } from '../core/oc-document';

@Component({
  selector: 'oc-coder',
  styleUrls: ['app/coder/coder.styles.css'],
  templateUrl: 'app/coder/coder.html',
  directives: [QuoteEditingComponent, CodeSummaryComponent, MemoListComponent, TitleComponent],
  providers: [VisualizationInformationService]
})
export class CoderComponent {
    @Input() doc : OcDocument;
    
    isLnbExpanded :boolean = false;
    
    constructor(private visualizationInformationService: VisualizationInformationService){
      
    }
    
    onSaveButtonClicked(){
      let json = this.doc.toSerializedJson()
      console.log(json);
      let jsonString = JSON.stringify(json);
      var blob = new Blob([jsonString], {type:'application/json'});
      var url = URL.createObjectURL(blob);
      saveAs(blob, "opencoder-document.json");
      
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