import { Injectable } from '@angular/core';
import { Document } from './document';
import { Quote } from './quote';

@Injectable()
export class CsvDeserializerService{
    convertCsvFiles(files: Array<File>){
        var document: Document = new Document();
         
        for(var file of files)
        {
            var result = Papa.parse(file, {header:true});
            console.log(result);
            //document.quotes.push.apply(document.quotes, result.data.map(function(d){return new Quote(d)}));
           
        }
        
        console.log(`${document.quotes.length} quotes were imported.`);
        console.log(document);
    }
}