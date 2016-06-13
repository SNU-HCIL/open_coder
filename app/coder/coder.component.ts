import { Component, Input, OnInit} from '@angular/core';
import { RouteParams, Router} from '@angular/router-deprecated';

import { QuoteEditingComponent } from './quote-editing.component';
import { CodeSummaryComponent} from './code-summary.component';
import { MemoListComponent } from './memo-list.component';
import {TitleComponent} from '../ui/common/title.component';
import {VisualizationInformationService} from '../services/visualization-information.service';
import { OcDocument } from '../core/oc-document';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'oc-coder',
  styleUrls: ['app/coder/coder.styles.css'],
  templateUrl: 'app/coder/coder.html',
  directives: [QuoteEditingComponent, CodeSummaryComponent, MemoListComponent, TitleComponent],
  providers: [VisualizationInformationService]
})
export class CoderComponent implements OnInit {
    doc : OcDocument;
    
    isLnbExpanded :boolean = false;
    
    constructor(private params: RouteParams, private authService: AuthService, private visualizationInformationService: VisualizationInformationService){
    }
    
    ngOnInit(){
      let id = +this.params.get('id');
      this.authService.getDocument(id).then(result=>{
      this.doc = OcDocument.fromJson(result)
      
      this.doc.subscribe((event)=>{
        
        if(event == "update")
        {
          this.sendDocumentDetail(id, this.doc);
        }
      })
    })
    }
    
    private sendDocumentDetail(id, doc){
      console.log("send document detail to server")
      this.authService.updateDocumentDetail(id, this.doc).then((result)=>{
        console.log(result);
      })
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