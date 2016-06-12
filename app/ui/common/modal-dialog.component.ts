import { Component, Input, ContentChildren, ElementRef, AfterViewInit } from '@angular/core';
import { TitleComponent } from './title.component';

@Component({
  selector: 'oc-modal-container',
  styles: [`
    :root{
        visible:collapse;
    }

    #modal_background{
        background:rgba(0,0,0,0.7);
        width:100%;
        height:100%;
        position: fixed;
        top: 0px;
        left: 0px;
    }

    #modal_background > table{
        width:100%;
        height:100%;
    }
    
    #modal_background > table td{
        vertical-align:middle;
        text-align:center;
    }

    #modal_frame{
        padding: 0px 25px 24px 25px;
        border-radius: 6px;
        display: inline-block;
        background: white;
        max-width: 80%;
    }

    #modal_content{
        text-align: initial;
    }

    #modal_content #buttons{
        text-align: right;
    }
    
    #modal_content .message{
        font-weight: 600;
        color: #505050;
        font-size: 17px;
        margin-top: 23px;
    }
  `],
  template: `
    <div id="modal_background" *ngIf="isShown">
        <table>
            <tr><td>
                <div id="modal_frame">
                    <div id="modal_content">
                        <oc-title *ngIf="title" [title]="title"></oc-title>
                        <div *ngIf="message" class="message">{{message}}</div>
                        <ng-content></ng-content>
                        <div id="buttons">
                            <div class="separator"></div>
                            <button *ngIf="showOkButton" class="dialog" (click)="onOk()">Ok</button>     
                            <button *ngIf="showCancelButton" class="dialog" (click)="onCancel()">Cancel</button>     
                        </div>
                    </div>
                </div>
            </td></tr>
        </table>
    </div>
    `,
    properties: ['title', 'showCancelButton'],
    directives: [TitleComponent]
})
export class ModalDialogComponent {
    private isShown = false;
    
    private showOkButton = false;
    private showCancelButton = true;
    private okHandler: ()=>void = null;
    private cancelHandler: ()=>void = null;
    
    
    title : string;
    
    private message:string;

    private root$;

    constructor(private elementRef : ElementRef)
    {

    }

    ngAfterViewInit(){
        this.root$ = jQuery(this.elementRef.nativeElement);
    }
    
    clear(){
        this.title = null;
        this.message = null;
        this.showOkButton = false;
        this.showCancelButton = true;
        this.okHandler = null;
        this.cancelHandler = null;
    }

    show(title?:string, message?:string, showOkButton?: boolean, showCancelButton?:boolean, okHandler?:()=>void, cancelHandler?:()=>void){
        if(title != null)
            this.title = title;
        
        if(message != null)
            this.message = message
        
        if(showOkButton != null)
            this.showOkButton = showOkButton;
        
        if(showCancelButton != null)
            this.showCancelButton = showCancelButton;
        
        if(okHandler != null)
            this.okHandler = okHandler;
        
        if(cancelHandler != null)
            this.cancelHandler = cancelHandler;
        
        this.isShown = true;
        this.root$.hide();
        this.root$.fadeIn(500);
    }
    
    onOk(){
        if(this.okHandler) this.okHandler();
        this.close();
    }
    
    onCancel(){
        if(this.cancelHandler) this.cancelHandler();
        this.close();
    }

    close(){
        this.root$.fadeOut(200, ()=>{this.isShown = false});
    }
}