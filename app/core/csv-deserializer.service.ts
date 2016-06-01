import { Injectable } from '@angular/core';
import { Document } from './document';
import { Quote } from './quote';
import { CsvDeserializerUnit } from './csv-deserializer-unit';

@Injectable()
export class CsvDeserializerService{
    convertCsvFiles(files: Array<File>){
        var document: Document = new Document();
        
        let unit = new CsvDeserializerUnit(files);
        unit.loadAsync((data:Array<any>)=>{
            document.quotes = document.quotes.concat(data.map(function(row){return new Quote(row);}));
            
            console.log(`${document.quotes.length} quotes were imported.`);
            console.log(document);
        });
    }
}