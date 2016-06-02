import { Injectable } from '@angular/core';
import { Document } from './document';
import { Quote } from './quote';
import { CsvDeserializerUnit } from './csv-deserializer-unit';

@Injectable()
export class CsvDeserializerService{
    convertCsvFiles(files: Array<File>, callback: (document)=>void){
        var document: Document = new Document();
        
        let unit = new CsvDeserializerUnit(files);
        unit.loadAsync((data:Array<any>)=>{
            document.quotes = document.quotes.concat(data.map(function(row){return Quote.fromJson(row);}).filter((q)=>{return q!=null}));
            document.update();
            console.log(`${document.quotes.length} quotes were imported.`);
            console.log(document.labels);
            callback(document);
        });
    }
}