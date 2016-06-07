import { Component, EventEmitter, Output } from '@angular/core';
import {OcDocument} from './core/oc-document';

@Component({
  selector: 'oc-file-open',
  styles: [`
    .error{    
      color: #FF928B;
      font-size: 12px;
      font-weight: bold;
      margin-top: 10px;
    }`],
  template: `
    <div class="file_open">
      <input type="file" name="file" (change)="fileChangeEvent($event)" placeholder="Select Json file">
      <button *ngIf="file" (click)="open()">Open</button>
      <div class="error" *ngIf="error">{{error}}</div>
    </div>
  `
})
export class FileOpenComponent {
  file: File;
  error: string;
  
  @Output() documentOpened = new EventEmitter();
  
  fileChangeEvent(fileInput: any){
    if(fileInput.target.files.length>0)
    {
      this.file = fileInput.target.files[0];
    }
    else{
      this.file = null;
    }
  }
  
  open(){
    console.log(`Try to open document...`);
    this.error = null;
    var re = /(?:\.([^.]+))?$/;
    if(re.exec(this.file.name)[1] != "json")
    {
        this.error = "Wrong file format. Select CSV file only.";
        return;
    }
    
    var jsonString : string = null;
    
    var reader = new FileReader();
    reader.onload = (e)=>{
      console.log(e);
      jsonString = reader.result;
      console.log(JSON.parse(jsonString));
      this.documentOpened.next(OcDocument.fromJson(JSON.parse(jsonString)));
    };
    reader.readAsText(this.file);
    
  }
  
  
  
  
}