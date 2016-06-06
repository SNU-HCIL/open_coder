import { Component, Input, ElementRef } from '@angular/core';
import {NullAlternativePipe} from './common/null-alternative.pipe';
import {VisualizationInformationService} from './visualization-information.service';
import { Memo } from '../core/memo';

@Component({
  selector: 'oc-memo',
  styleUrls:['app/ui/memo.css'],
  templateUrl: 'app/ui/memo.html',
  directives: [],
  pipes: [NullAlternativePipe]
})
export class MemoComponent {
    @Input() memo : Memo;
    
    constructor(private elmRef: ElementRef, private visualizationInformationService: VisualizationInformationService){
      
    }
    
}