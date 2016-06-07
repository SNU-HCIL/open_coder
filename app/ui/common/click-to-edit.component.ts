import { Component, Input, Output, EventEmitter, ElementRef, AfterViewChecked } from '@angular/core';
import {NullAlternativePipe} from './null-alternative.pipe';

import {IStyleContainer} from './style-container.interface';

@Component({
  selector: 'oc-click-to-edit',
  styles: [`
    .click_to_edit{
        position:relative;
        cursor: pointer;
    }
    
    .input{
        width: 100%;
    }
  
    input.input{
    }
    
    textarea.input{
        width: 100%;
        min-height: 150px;
    }
    
    .button_container{
        margin-top: 5px;
        text-align: right;
    }
  `],
  template: `
    <div class="click_to_edit" [style.margin]="componentMarginStyle">
        <div class="text" *ngIf="!isEditMode" (click)="onClicked()">{{target[propertyName] | nullAlternative: altText}}</div>
        <div class="input_box" *ngIf="isEditMode">
            <input class="input" *ngIf="singleLine==true" type="text" [(ngModel)]="currentEditedText" (keypress)="keyPressed($event.keyCode)">  
            <textarea class="input" *ngIf="singleLine==false" [(ngModel)]="currentEditedText" (keypress)="keyPressed($event.keyCode)"></textarea>
            
            <div class="button_container">
                <button class="button.mini" (click)="onApplyClicked()">Apply</button>
                <button class="button.mini" (click)="onCancelClicked()">Cancel</button>
            </div>
        </div>
    </div>
    `,
  properties: ['propertyName', 'singleLine', 'altText', 'overrideInputStyle', 'overrideTextStyle'],
  pipes: [NullAlternativePipe],
})
export class ClickToEditComponent implements AfterViewChecked {
    @Input() target;
    
    style_string = "color: red; background: blue; font-size: 50px;";
    
    //properties
    propertyName = "content";
    singleLine : boolean = true;
    altText : string = "No content";
    @Input() componentMarginStyle: string = "";
    componentPaddingStyle: string = ""; 
    
    
    @Output() editApplied = new EventEmitter();
        
    isEditMode :boolean = false;
    
    private focusInputInThisCycle = false;
    
    @Input() private currentEditedText : string;
    
    constructor(private elementRef: ElementRef){
    }
    
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
        if(keyCode == 13)
        {
            this.onApplyClicked();
        }
    }
    
    ngAfterViewChecked(){
        if(this.focusInputInThisCycle)
        {
            jQuery(this.elementRef.nativeElement).find(".input").focus();
            this.focusInputInThisCycle = false;
        }
    }
    
}