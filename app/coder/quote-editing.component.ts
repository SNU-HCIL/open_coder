import { Component, Input, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import {Quote} from '../core/quote';
import {Entry} from '../core/entry';

import {ResizableTableColumn} from '../ui/common/resizable-table-column';

import {QuoteEditingState} from './quote-editing-state';
import {VisualizationInformationService} from '../services/visualization-information.service';

@Component({
  selector: 'tr.quote_element',
  styleUrls: ['app/coder/quote-editing.styles.css'],
  styles: [`
    td.label, td.content, td.codes{
    border-bottom: 1px solid #eaeaea;
    padding-right: 9px;
    }
    `],
  template: 
    `
      <td class="content" [style.border-left-color]="visualizationInformationService.getCategoricalColor(quote.parent.labels.indexOf(quote.label))">{{quote.content}}</td>
      <td class="handle"><div></div></td>
      <td class="codes">
        <ul class="code_list">
            <li *ngFor="let code of quote.codes" class="code_block">
                <span class="code">
                <span>{{code.content}}</span>
                <button class="mini" (click)="onRemoveCodeClicked(code)">✖</button>
                </span>
            </li> 
            <li>
                <div *ngIf="state == 'adding'" class="code adding_panel">
                   <input class="code_name_input" type="text" (input)="newCodeName = $event.target.value" (keyup)="newCodeNameKeyUpEvent($event)">
                   <div *ngIf="autoCompleteList" class="autocomplete_list">
                    <ul>
                        <li *ngFor="let candidate of autoCompleteList" (click)="onCandidateClicked(candidate)">
                            <div>
                                {{candidate}}
                            </div>
                        </li>
                    </ul>
                   </div>
                   <button (click)="onApplyNewCodeButtonClicked()">Add</button>
                   <button (click)="onCanceled()" >Cancel</button>
                   <br>
                   <span *ngIf="error" class="error">{{error}}</span>
                </div>
                <button class="circle" *ngIf="state == 'idle'" (click)="onAddCodeButtonClicked()">+</button>
            </li>
        </ul>
      </td>
    `,
  directives: []
})
export class QuoteEditingComponent implements OnInit, AfterViewInit {
    @Input() quote: Quote
    
    state: string = "idle"
    error: string
    autoCompleteList : Array<string>
    
    private newCodeName : string
    
    private resizableTableColumn : ResizableTableColumn;
    
    private input$ : JQuery;
    
    constructor(private elmRef : ElementRef, private visualizationInformationService: VisualizationInformationService)
    {
        
    }
    
    ngOnInit():any{
        
    }
    
    ngAfterViewInit(){
        this.resizableTableColumn = new ResizableTableColumn(this.elmRef.nativeElement, "td.handle", "td.content");
        this.input$ = jQuery(this.elmRef.nativeElement).find(".code_name_input") 
        this.input$.val(null);
        
    }
    
    onAddCodeButtonClicked(): void
    {
        this.error = null
        this.state = "adding"
    }
    
    onCanceled() : void {
        this.state = "idle"
    }
    
    newCodeNameKeyUpEvent(event : any) : void
    {
        let fuse = new Fuse(this.quote.parent.codeCounts.map((cc)=>{return cc.code}), null);
        console.log(this.newCodeName)
        let fuzzyIndices = fuse.search(this.newCodeName);
        if(fuzzyIndices != null && fuzzyIndices.length > 0)
        {
            this.autoCompleteList = fuzzyIndices.map((i)=>{return this.quote.parent.codeCounts[i].code});
        }
        else{
            this.autoCompleteList = null
        }
    }
    
    onCandidateClicked(candidate: string){
        this.newCodeName = candidate;
        this.autoCompleteList = null;
    }
    
    onApplyNewCodeButtonClicked()
    {
        if(this.quote.codes.map((c)=>{return c.content}).indexOf(this.newCodeName) < 0)
        {
            this.quote.codes.push(new Entry(this.newCodeName));
            this.quote.parent.update();
            this.state = "idle";
            this.error = null
        }
        else{
            this.error = "Duplicate code.";
        }
    }
    
    onRemoveCodeClicked(code : Entry){
        this.quote.codes.splice(this.quote.codes.indexOf(code), 1);
        this.quote.parent.update();
    }
}