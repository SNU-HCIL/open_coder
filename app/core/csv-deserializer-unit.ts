import { Document } from './document';
import { Quote } from './quote';

export class CsvDeserializerUnit{
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