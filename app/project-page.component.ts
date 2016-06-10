import { Component, Input, Output, OnInit, AfterViewInit, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated';

import { PluralizePipe } from './ui/common/pluralize.pipe';
import { AuthService } from './services/auth.service';
import { StyleInjector, GRADIENT_BACKGROUND_STYLE } from './ui/common/style_injector';
import { TopBarComponent } from './ui/common/top-bar.component';
import { TitleComponent } from './ui/common/title.component';

import { FileOpenComponent } from './ui/file-open.component';

import { ModalDialogComponent } from './ui/common/modal-dialog.component';

import {OcDocument} from './core/oc-document';

@Component({
  selector: 'oc-project-page',
  styleUrls:['app/project-page.styles.css'],
  templateUrl: 'app/project-page.html',
  directives: [TitleComponent, TopBarComponent, ModalDialogComponent, FileOpenComponent],
  pipes:[PluralizePipe]
})
export class ProjectPageComponent implements OnInit {

  @ViewChild('modal') modal: ModalDialogComponent;

  private project:any;
  private bgColorInjector:StyleInjector = new StyleInjector("body", GRADIENT_BACKGROUND_STYLE);
  
  constructor(private params: RouteParams, private Router : Router, private authService: AuthService)
  {
  }

  ngOnInit()
  {
    this.bgColorInjector.apply();

    let id = +this.params.get('id');
    this.authService.getProject(id).then(result=>{
      this.project = result
    })
  }

  toAddMode(){
    this.modal.title = "Add New Document"
    this.modal.show();
  }

  documentFileLoaded(doc : OcDocument){
    let serializedJson = doc.toSerializedJson()
    this.authService.createDocument(this.project.id, serializedJson.name, serializedJson.description, JSON.stringify(serializedJson.memos), JSON.stringify(serializedJson.quotes))
      .then(res=>{
        this.modal.close();
        console.log(res);
        this.project.documents.push(res);
      })
  }
}
    