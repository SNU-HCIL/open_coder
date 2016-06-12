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

  @ViewChild('creationModal') creationModal: ModalDialogComponent;
  @ViewChild('alertModal') alertModal: ModalDialogComponent;
  

  private project:any;
  private bgColorInjector:StyleInjector = new StyleInjector("body", GRADIENT_BACKGROUND_STYLE);
  
  constructor(private params: RouteParams, private router : Router, private authService: AuthService)
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
  
  ngAfterViewInit(){
  }

  toAddMode(){
    this.creationModal.title = "Add New Document"
    this.creationModal.show();
  }
  
  openDocument(id: number){
    this.router.navigate(['Document', {id: id}]);
  }

  documentFileLoaded(doc : OcDocument){
    let serializedJson = doc.toSerializedJson()
    this.authService.createDocument(this.project.id, serializedJson.name, serializedJson.description, JSON.stringify(serializedJson.memos), JSON.stringify(serializedJson.quotes))
      .then(res=>{
        this.creationModal.close();
        console.log(res);
        this.project.documents.push(res);
      })
  }
  
  onRemoveDocumentClicked(event, id:number)
  {
    event.stopPropagation();
    this.alertModal.show(null, "Do you want to remove the document?", true, true, 
      ()=>{
        this.authService.removeDocument(id).then((result)=>{
          let index = this.project.documents.indexOf(this.project.documents.find((d)=>d.id == result.id))
          this.project.documents.splice(index, 1);
        })
      }, null);
  }
}
    