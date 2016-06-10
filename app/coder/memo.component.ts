import { Component, Input, Output, OnInit, ElementRef, EventEmitter } from '@angular/core';
import {ClickToEditComponent} from '../ui/common/click-to-edit.component';
import {VisualizationInformationService} from '../services/visualization-information.service';
import { Memo } from '../core/memo';

@Component({
  selector: 'oc-memo',
  styleUrls:['app/coder/memo.css'],
  templateUrl: 'app/coder/memo.html',
  directives: [ClickToEditComponent]
})
export class MemoComponent implements OnInit {
    @Input() memo : Memo;
    @Output() onRemove = new EventEmitter();
    
    constructor(private elmRef: ElementRef, private visualizationInformationService: VisualizationInformationService){
      
    }
    
    ngOnInit(){
       var jquery = jQuery(this.elmRef.nativeElement);
       
    }
    
    onRemoveButtonClicked(){
      this.onRemove.next(this.memo);
    }
}