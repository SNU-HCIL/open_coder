import { Component, Input, Output, OnInit, AfterViewInit, ElementRef, EventEmitter } from '@angular/core';
import {Quote} from '../core/quote';
import {Entry} from '../core/entry';

import {ResizableTableColumn} from '../ui/common/resizable-table-column';

import {QuoteEditingState} from './quote-editing-state';
import {VisualizationInformationService} from '../services/visualization-information.service';



@Component({
    selector: 'oc-new-code-panel',
    styleUrls:[
        'app/coder/quote-editing.styles.css'
    ],
    styles:[
        `
        .code{
            background:#afafaf;
        }

        .adding_panel{
        position:relative;
        float:left;
        clear:both;
        }

        .autocomplete_list{
        position:absolute;
        background: #fafafa;
        border: 1px solid #afafaf;
        border-top: hidden;
        -webkit-box-shadow: 0px 2px 2px 1px rgba(0,0,0,0.23);
        -moz-box-shadow: 0px 2px 2px 1px rgba(0,0,0,0.23);
        box-shadow: 0px 2px 2px 1px rgba(0,0,0,0.23);
        }

        .autocomplete_list ul{
        padding: 0px;
        position: relative;
        list-style-type: none;
        }

        .autocomplete_list li{
        cursor: pointer;
        width: 100%;
        margin: 0;
        }

        .autocomplete_list li div{
        padding: 6px;
        }

        .autocomplete_list li:last-child{
        margin-bottom: 0px;
        }

        .autocomplete_list li:hover{
        background: #525252;
        color: white;
        }
        `
    ],
    template:
    `
        <div class="code adding_panel">
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
            <button (click)="onCancelClicked()" >Cancel</button>
            <br>
            <span *ngIf="error" class="error">{{error}}</span>
        </div>
    `
})
class NewCodePanelComponent implements AfterViewInit{
    error: string;
    autoCompleteList : Array<string>;
    private newCodeName : string;
    private input$ : JQuery;

    @Output() onNewCodeApply = new EventEmitter();
    @Output() onCanceled = new EventEmitter();

    @Input() quote : Quote;
    

    constructor(private elmRef : ElementRef)
    {

    }

    ngAfterViewInit(){
        this.input$ = jQuery(this.elmRef.nativeElement).find(".code_name_input") 
        this.input$.val(null);
       
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
        console.log(this.input$);
        this.input$.val(this.newCodeName);
        this.autoCompleteList = null;
    }
    
    onApplyNewCodeButtonClicked()
    {
        if(this.quote.codes.map((c)=>{return c.content}).indexOf(this.newCodeName) < 0)
        {
            this.error = null
            this.onNewCodeApply.next(this.newCodeName);
        }
        else{
            this.error = "Duplicate code.";
        }
    }
    
    onCancelClicked() : void {
        this.onCanceled.next(this.quote);
    }
}



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
                <oc-new-code-panel *ngIf="state == 'adding'" [quote]="quote" (onNewCodeApply)="onNewCodeApplied($event)" (onCanceled)="onCanceled($event)"></oc-new-code-panel>
                <button class="circle add_code" *ngIf="state == 'idle'" (click)="onAddCodeButtonClicked()">+</button>
            </li>
        </ul>
      </td>
    `,
  directives: [NewCodePanelComponent]
})
export class QuoteEditingComponent implements AfterViewInit {
    @Input() quote: Quote
    
    state: string = "idle"   
    
    private resizableTableColumn : ResizableTableColumn;
        
    constructor(private elmRef : ElementRef, private visualizationInformationService: VisualizationInformationService)
    {
        
    }
    
    ngAfterViewInit(){
        this.resizableTableColumn = new ResizableTableColumn(this.elmRef.nativeElement, "td.handle", "td.content"); 
    }
    
    onAddCodeButtonClicked(): void
    {
        this.state = "adding"
    }

    onCanceled():void
    {
        this.state = "idle"
    }
    
    onNewCodeApplied(newCodeName: string)
    {
        this.quote.codes.push(new Entry(newCodeName));
        this.quote.parent.update();
        this.state = "idle";
    }
    
    onRemoveCodeClicked(code : Entry){
        this.quote.codes.splice(this.quote.codes.indexOf(code), 1);
        this.quote.parent.update();
    }
}