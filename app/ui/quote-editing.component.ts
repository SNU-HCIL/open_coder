import { Component, Input, OnInit } from '@angular/core';
import {Quote} from '../core/quote';
import {Entry} from '../core/entry';

import {QuoteEditingState} from './quote-editing-state';
import {VisualizationInformationService} from './visualization-information.service';

@Component({
  selector: 'tr.quote_element',
  styleUrls: ['app/ui/quote-editing.styles.css'],
  styles: [`
    td.label, td.content, td.codes{
    border-bottom: 1px solid #eaeaea;
    padding-right: 9px;
    }
    `],
  template: 
    `
      <td class="content" [style.border-left-color]="visualizationInformationService.getCategoricalColor(quote.parent.labels.indexOf(quote.label))">{{quote.content}}</td>
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
                   <input class="code_name_input" type="text" [(ngModel)]="newCodeName" (keyup)="newCodeNameKeyUpEvent($event)">
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
export class QuoteEditingComponent implements OnInit {
    @Input() quote: Quote
    
    state: string = "idle"
    error: string
    autoCompleteList : Array<string>
    
    @Input() private newCodeName : string
    
    constructor(private visualizationInformationService: VisualizationInformationService)
    {
        
    }
    
    ngOnInit():any{
        
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