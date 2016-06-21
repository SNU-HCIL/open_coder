import { Component, EventEmitter, Output } from '@angular/core';
import { CsvDeserializerService } from '../services/csv-deserializer.service';

@Component({
  selector: 'oc-csv-files-open',
  styles: [`
    .error{    
      color: #FF928B;
      font-size: 12px;
      font-weight: bold;
      margin-top: 10px;
    }`],
  template: `
    <div class="file_open">
      <input type="file" name="file[]" multiple (change)="fileChangeEvent($event)" placeholder="Select CSV files (Multiple choice allowed)">
      <button *ngIf="files" (click)="open()">Open</button>
      <div class="error" *ngIf="error">{{error}}</div>
    </div>
  `,
  providers: [CsvDeserializerService]
})
export class CsvFilesOpenComponent {
  files: Array<File>;
  error: string;
  
  @Output() documentOpened = new EventEmitter();
  
  constructor(private csvDeserializerService: CsvDeserializerService){}
  
  fileChangeEvent(fileInput: any){
    this.files = <Array<File>> fileInput.target.files;
  }
  
  open(){
    console.log(`Try to open ${this.files.length} files...`);
    this.error = null;
    var re = /(?:\.([^.]+))?$/;
    for (var file of this.files)
    {
      if(re.exec(file.name)[1] != "csv")
      {
        this.error = "Wrong file format. Select CSV file only.";
        return;
      }
    }
    
    this.csvDeserializerService.convertCsvFiles(this.files, (document)=>{
      this.documentOpened.next(document);
    });
    
  }
  
  
  
  
}