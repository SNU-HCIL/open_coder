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
  `],
  template: `
    <div class="title">
        {{title}}
    </div>
    `,
  properties: ['title']
})
export class TitleComponent {
    title : string;
}