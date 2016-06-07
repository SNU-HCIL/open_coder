import { Component, Input, Output, EventEmitter, ElementRef, AfterViewChecked } from '@angular/core';
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
        <div *ngIf="!isEditMode" (click)="onClicked()">{{target[propertyName] | nullAlternative: altText}}</div>
        <table class="input_box" *ngIf="singleLine && isEditMode">
            <tr>
                <td class="input_cell">
                    <input class="input" type="text" [(ngModel)]="currentEditedText" (keypress)="keyPressed($event.keyCode)">    
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
  properties: ['propertyName', 'singleLine', 'altText'],
  pipes: [NullAlternativePipe],
})
export class ClickToEditComponent implements AfterViewChecked {
    @Input() target;
    propertyName = "content";
    
    @Output() editApplied = new EventEmitter();
    
    singleLine : boolean = true;
    
    altText : string = "No content";
    
    isEditMode :boolean = false;
    
    private focusInputInThisCycle = false;
    
    @Input() private currentEditedText : string;
    
    constructor(private elementRef: ElementRef){}
    
    private onClicked(){
        if(this.isEditMode == false)
        {
            this.setEditMode(true);
        }
    }
    
    private setEditMode(mode: boolean){
        this.isEditMode = mode;
        if(mode == true)
        {
            this.currentEditedText = this.target[this.propertyName];
            this.focusInputInThisCycle = true;
        }
        else{
            
        }
    }
    
    private onApplyClicked(){
        this.target[this.propertyName] = this.currentEditedText
        this.editApplied.next(this.currentEditedText);
        this.isEditMode = false;
    }
    
    private onCancelClicked(){
        this.setEditMode(false);
    }
    
    private keyPressed(keyCode: number)
    {
        console.log(keyCode);
        if(keyCode == 13)
        {
            this.onApplyClicked();
        }
    }
    
    ngAfterViewChecked(){
        if(this.focusInputInThisCycle)
        {
            jQuery(this.elementRef.nativeElement).find("input").focus();
            this.focusInputInThisCycle = false;
        }
    }
    
}