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
        min-width: 40%;
        max-width: 80%;
    }

    #modal_content{
        text-align: initial;
    }

    #modal_content #buttons{
        text-align: right;
    }
  `],
  template: `
    <div id="modal_background" *ngIf="isShown">
        <table>
            <tr><td>
                <div id="modal_frame">
                    <div id="modal_content">
                        <oc-title [title]="title"></oc-title>
                        <ng-content></ng-content>
                        <div id="buttons">
                        <div class="separator"></div>
                            <button *ngIf="showCancelButton" class="dialog" (click)="close()">Cancel</button>     
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
    private showCancelButton = true;
    title : string;

    private root$;

    constructor(private elementRef : ElementRef)
    {

    }

    ngAfterViewInit(){
        this.root$ = jQuery(this.elementRef.nativeElement);
    }

    show(){
        this.isShown = true;
        this.root$.hide();
        this.root$.fadeIn(500);
    }

    close(){
        this.root$.fadeOut(200, ()=>{this.isShown = false});
    }
}