import { Component, Input } from '@angular/core';

@Component({
  selector: 'oc-title',
  styles: [`
    .title{
        font-size: 22px;
        color: #575757;
        font-weight: bold;
        border-bottom: 1px solid #afafaf;
        margin-bottom: 26px;
        padding-bottom: 12px;
        margin-top: 11px;
    }
    
    .title.white{
      color: #fafafa;
      border-bottom-color: rgba(255,255,255,0.2);
    }
    
    .title .right_content{
      float:right;
    }
  `],
  template: `
    <div class="title" [ngClass]="{white:white}">
        {{title}}
        <div class="right_content">
          <ng-content></ng-content>
        </div>
        <div style="clear:both"></div>
    </div>
    `,
  properties: ['title', 'white']
})
export class TitleComponent {
    title : string;
    white : boolean;
}