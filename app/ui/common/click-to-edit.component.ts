import { Component, Input, Output, EventEmitter } from '@angular/core';
import {NullAlternativePipe} from './null-alternative.pipe';

@Component({
  selector: 'oc-click-to-edit',
  styles: [`
    .click_to_edit{
        position:relative;
        cursor: pointer;
    }
  
    table.input_box{
        width: 100%;
    }
  `],
  template: `
    <div class="click_to_edit">
        <div *ngIf="!isEditMode" (click)="onClicked()">{{content | nullAlternative: altText}}</div>
        <table class="input_box" *ngIf="singleLine && isEditMode">
            <tr>
                <td class="input_cell">
                    <input type="text" [(ngModel)]="currentEditedText">    
                </td>
                <td>
                    <button class="button.mini" (click)="onApplyClicked()">Apply</button>
                </td>
                <td>
                    <button class="button.mini" (click)="onCancelClicked()">Cancel</button>
                </td>
            </tr>
        </table>
    </div>
    `,
  properties: ['singleLine', 'altText'],
  pipes: [NullAlternativePipe]
})
export class ClickToEditComponent {
    @Input() content: string;
    
    @Output() editApplied = new EventEmitter();
    
    singleLine : boolean = true;
    
    altText : string = "No content";
    
    isEditMode :boolean = false;
    
    @Input() private currentEditedText : string;
    
    private onClicked(){
        if(this.isEditMode == false)
        {
            
            console.log("start editmode")
            
            this.isEditMode = true;
            this.currentEditedText = this.content;
        }
    }
    
    private onApplyClicked(){
        console.log("apply")
        console.log(this.currentEditedText);
        this.content = this.currentEditedText
        this.editApplied.next(this.currentEditedText);
        this.isEditMode = false;
    }
    
    private onCancelClicked(){
        console.log("jaja")
        this.isEditMode = false;
    }
    
}