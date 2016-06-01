import { Component } from '@angular/core';

@Component({
  selector: 'oc-file-open',
  template: `
    <div class="file_open">
      <input type="file" (change)="fileChangeEvent($event)" placeholder="Select CSV files (Multiple choice allowed)">
      <button *ngIf="files" (click)="open()">Open</button>
    </div>
  `
})
export class FileOpenComponent {
  files: Array<File>;
  
  fileChangeEvent(fileInput: any){
    this.files = <Array<File>> fileInput.target.files;
  }
  
  open(){
    console.log("Try to open ${this.files.length} files...");
  }
}