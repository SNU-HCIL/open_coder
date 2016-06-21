import { Injectable } from '@angular/core';
import { OcDocument } from '../core/oc-document';
import { Quote } from '../core/quote';

@Injectable()
export class CsvDeserializerService{
    convertCsvFiles(files: Array<File>, callback: (document)=>void){
        var document: OcDocument = new OcDocument();
        
        let unit = new CsvDeserializerUnit(files);
        unit.loadAsync((data:Array<any>)=>{
            document.quotes = document.quotes.concat(data.map(function(row){return Quote.fromJson(row);}).filter((q)=>{return q!=null}));
            document.update();
            console.log(`${document.quotes.length} quotes were imported.`);
            callback(document);
        });
    }
}

class CsvDeserializerUnit{
    private files:Array<File>
    private loaded:Array<any[]>
    
    constructor(files:Array<File>)
    {
        this.files = files;
        this.loaded = [];
    }
    
    private combine(): Array<any>{
        let result = [];
        
        for(var element of this.loaded)
        {
            result = result.concat(element);
        }
        
        return result;
    }
    
    loadAsync(callback : (data: Array<any>)=>any ) : void{
        for(var file of this.files)
        {
            Papa.parse(file, {
                header:true, 
                complete: (result) => {
                    this.loaded.push(result.data);
                    if(this.files.length == this.loaded.length)
                    {
                        console.log("Loading complete.");
                        callback(this.combine());
                    }
                }
            });
        }
    }
}