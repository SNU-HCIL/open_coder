import { Component, Input } from '@angular/core';
import {Quote} from '../core/quote';
import {QuoteEditingState} from './quote-editing-state';


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
      <td class="label">
        {{quote.label}}
      </td>
      <td class="content">{{quote.content}}</td>
      <td class="codes">
        <ul class="code_list">
            <li *ngFor="let code of quote.codes">
                <span class="code">
                <span>{{code}}</span>
                <button class="mini" (click)="onRemoveCodeClicked(code)">✖</button>
                </span>
            </li> 
            <li>
                <span *ngIf="state == 'adding'" class="code">
                   <input type="text" (keyup)="newCodeNameKeyUpEvent($event)">
                   <button (click)="onApplyNewCodeButtonClicked()">Add</button>
                   <button (click)="onCanceled()" >Cancel</button>
                   
                </span>
                <button class="round" *ngIf="state == 'idle'" (click)="onAddCodeButtonClicked()">+</button>
            </li>
        </ul>
      </td>
    `,
  directives: []
})
export class QuoteEditingComponent {
   state: string = "idle"
    @Input() quote: Quote
    
    private newCodeName : string
    
    onAddCodeButtonClicked()
    {
        this.state = "adding"
    }
    
    onCanceled(){
        this.state = "idle"
    }
    
    newCodeNameKeyUpEvent(event : any)
    {
        this.newCodeName = event.target.value;
    }
    
    onApplyNewCodeButtonClicked()
    {
        this.quote.codes.push(this.newCodeName);
        this.quote.parent.update();
        this.state = "idle";
    }
    
    onRemoveCodeClicked(code : string){
        this.quote.codes.splice(this.quote.codes.indexOf(code), 1);
        this.quote.parent.update();
    }
}