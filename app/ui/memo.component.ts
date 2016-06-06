import { Component, Input, OnInit, ElementRef } from '@angular/core';
import {ClickToEditComponent} from './common/click-to-edit.component';
import {VisualizationInformationService} from './visualization-information.service';
import { Memo } from '../core/memo';

@Component({
  selector: 'oc-memo',
  styleUrls:['app/ui/memo.css'],
  templateUrl: 'app/ui/memo.html',
  directives: [ClickToEditComponent]
})
export class MemoComponent implements OnInit {
    @Input() memo : Memo;
    
    constructor(private elmRef: ElementRef, private visualizationInformationService: VisualizationInformationService){
      
    }
    
    ngOnInit(){
       var jquery = jQuery(this.elmRef.nativeElement);
       
    }
}