import { Component, Input, Output, OnInit, AfterViewInit, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated';

import { PluralizePipe } from './ui/common/pluralize.pipe';
import { FromNowPipe } from './ui/common/from-now.pipe';
import { AuthService } from './services/auth.service';
import { StyleInjector, GRADIENT_BACKGROUND_STYLE } from './ui/common/style_injector';
import { TopBarComponent } from './ui/common/top-bar.component';
import { TitleComponent } from './ui/common/title.component';

import { CsvFilesOpenComponent } from './ui/csv-files-open.component';

import { ModalDialogComponent } from './ui/common/modal-dialog.component';

import {OcDocument} from './core/oc-document';



@Component({
  selector: 'oc-project-card-statistic',
  styles: [`

    .statistic{
      float:left;
      padding-right: 40px;
    }


    .statistic .unit{
      font-size: 14px;
      font-weight: 300;
      color: #7f8996;
    }

    .statistic .count{
      font-size: 24px;
      font-weight: 600;
      color: #468de5;
    }
  `],
  template:`
    <div class="statistic">
      <div class="count">
        {{count}}
      </div>
      <div class="unit" *ngIf="pluralizeUnit==true">
        {{count | pluralize:unit:false}}
      </div>
      <div class="unit" *ngIf="pluralizeUnit==false">
        {{unit}}
      </div>
    </div>
    `,
  pipes: [PluralizePipe],
  properties: ['unit', 'count', 'pluralizeUnit']
})
class ProjectCardStatisticComponent{
  private unit;
  private count;
  private pluralizeUnit: boolean = true;
}



@Component({
  selector: 'oc-project-page',
  styleUrls:['app/project-page.styles.css', 'app/ui/small-form-styles.css'],
  templateUrl: 'app/project-page.html',
  directives: [ProjectCardStatisticComponent, TitleComponent, TopBarComponent, ModalDialogComponent, CsvFilesOpenComponent],
  pipes:[PluralizePipe, FromNowPipe]
})
export class ProjectPageComponent implements OnInit {

  @ViewChild('creationModal') creationModal: ModalDialogComponent;
  @ViewChild('alertModal') alertModal: ModalDialogComponent;
  @ViewChild('csvOpen') csvOpen: CsvFilesOpenComponent;
  
  private newDocumentName:string;
  private newDocumentDescription:string;
  
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
    this.creationModal.show({showOkButton:true, okHandler: 
      ()=>{
        if(this.csvOpen.hasFiles()==false)
        {
          console.log("no file provided. make empty document");
          let doc = new OcDocument();
          doc.name = this.newDocumentName;
          doc.description = this.newDocumentDescription;
          this.addNewDocument(doc);
        }
        else{
          console.log("csv sources provided. load data and make document");
          this.csvOpen.open(
            (document)=>{
              document.name = this.newDocumentName;
              document.description = this.newDocumentDescription;
              this.addNewDocument(document);
            }
          );
        }
      }, okValidationFunc: ()=>{
        if(this.csvOpen.hasFiles()==true)
        {
          if(this.csvOpen.isAllFileValidated()==false)
          {
            return false;
          }
        }
        
        if(this.newDocumentName==null || this.newDocumentName === "")
        {
          return false;
        }
        
        return true;
      }});
  }
  
  openDocument(id: number){
    this.router.navigate(['Document', {id: id}]);
  }
  
  onUploaderFileChanged(files:any){
    if(this.csvOpen.isAllFileValidated()==true){
    }
  }

  addNewDocument(doc : OcDocument){
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
    this.alertModal.show({message:"Do you want to remove the document?", showOkButton: true, showCancelButton: true, 
      okHandler: ()=>{
        this.authService.removeDocument(id).then((result)=>{
          let index = this.project.documents.indexOf(this.project.documents.find((d)=>d.id == result.id))
          this.project.documents.splice(index, 1);
        })
      }});
  }
}
    