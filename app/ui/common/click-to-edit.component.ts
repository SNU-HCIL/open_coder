import { Component, Input, Output, EventEmitter, ElementRef, AfterViewChecked } from '@angular/core';
import {NullAlternativePipe} from './null-alternative.pipe';
import {NewLinePipe} from './new-line.pipe';

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
        <div class="text" *ngIf="!isEditMode" (click)="onClicked()" [innerHTML]="target[propertyName] | newline | nullAlternative: altText"></div>
        <div class="input_box" *ngIf="isEditMode">
            <input class="input" *ngIf="singleLine==true" type="text" [(ngModel)]="currentEditedText" (keypress)="keyPressed($event.keyCode)">  
            <div class="multiline" *ngIf="singleLine==false"></div>

            <div class="button_container">
                <button class="button.mini" (click)="onApplyClicked()">Apply</button>
                <button class="button.mini" (click)="onCancelClicked()">Cancel</button>
            </div>
        </div>
    </div>
    `,
  properties: ['propertyName', 'singleLine', 'altText', 'overrideInputStyle', 'overrideTextStyle'],
  pipes: [NullAlternativePipe, NewLinePipe],
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

    private quill;    
    
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
            if(this.singleLine==false)
            {
            }
            else
                this.currentEditedText = this.target[this.propertyName];

            this.focusInputInThisCycle = true;
        }
        else{
            
        }
    }
    
    private onApplyClicked(){
        if(this.singleLine==false)
        {
            this.currentEditedText = this.quill.getText();
        }

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
            if(this.singleLine == true)
                jQuery(this.elementRef.nativeElement).find(".input").focus();
            else
            {
                this.quill = new Quill(".multiline", {theme: "snow", styles: {
                    '.ql-editor':{
                        'min-height': "initial"
                    },
                    '.ql-container':{
                        'height':'initial'
                    }
                }});

                var text = this.target[this.propertyName];
                this.quill.setText(text == null? "" : text);

                this.quill.focus();
            }

            this.focusInputInThisCycle = false;
        }
    }
    
}