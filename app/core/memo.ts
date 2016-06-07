import { Entry } from './document';

export class Memo extends Entry{
    title: string
    contexts: Entry[]
    
    toJson(){
        let result = super.toJson();
        result["title"] = this.title;
        //TODO entry
        return result;
    }
}