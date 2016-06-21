import { Component, EventEmitter, Output, AfterViewInit, ElementRef  } from '@angular/core';
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
      <div class="error" *ngIf="error">{{error}}</div>
    </div>
  `,
  providers: [CsvDeserializerService]
})
export class CsvFilesOpenComponent {
  files: Array<File>;
  error: string;
  
  //dropzone : Dropzone;
  
  @Output() documentOpened = new EventEmitter();
  @Output() fileChanged = new EventEmitter();
  
  constructor(private csvDeserializerService: CsvDeserializerService, private elmRef: ElementRef)
  {
    
  }
  
  ngAfterViewInit(){
    //this.dropzone = new Dropzone(jQuery(this.elmRef.nativeElement).find("input[type=file]").get(0), {url: null});
  }
  
  fileChangeEvent(fileInput: any){
    this.files = <Array<File>> fileInput.target.files;
    
    this.error = null;
    if(this.isAllFileValidated()==false)
    { 
        this.error = "Wrong file format. Select CSV file only.";
    }
    
    this.fileChanged.next(fileInput.target.files);
  }
  
  isAllFileValidated(): boolean{
    var re = /(?:\.([^.]+))?$/;
    for (var file of this.files)
    {
      if(re.exec(file.name)[1] != "csv")
      {
        return false;
      }
    }
    
    return true;
  }
  
  hasFiles(): boolean{
    if(this.files==null) return false;
    else return this.files.length>0;
  }
  
  open(complete?:(doc:any)=>void){
    console.log(`Try to open ${this.files.length} files...`);
    this.error = null;
    if(this.isAllFileValidated()==false)
    { 
        this.error = "Wrong file format. Select CSV file only.";
    }
    
    this.csvDeserializerService.convertCsvFiles(this.files, (document)=>{
      this.documentOpened.next(document);
      if(complete)
      {
        complete(document);
      }
    });
    
  }
  
  
  
  
}