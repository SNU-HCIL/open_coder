import { Component, Input } from '@angular/core';
import {TitleComponent} from './common/title.component';
import {MemoComponent} from './memo.component';
import {NullAlternativePipe} from './common/null-alternative.pipe';
import { OcDocument } from '../core/oc-document';
import { Memo } from '../core/memo';

@Component({
  selector: 'oc-memo-list',
  styleUrls: ['app/ui/memo-list.css'],
  templateUrl: 'app/ui/memo-list.html',
  directives: [TitleComponent, MemoComponent]
})
export class MemoListComponent {
    @Input() doc : OcDocument;
    
    
    addNewMemo(){
        this.doc.memos.push(new Memo());
    }
    
    removeMemo(memo: Memo)
    {
        this.doc.memos.splice(this.doc.memos.indexOf(memo), 1)
    }
    
}