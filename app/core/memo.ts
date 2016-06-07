import { Document, Entry } from './document';
import { Quote } from './quote';

export class Memo extends Entry{
    title: string
    contexts: Entry[] = []
    
    toJson(doc : Document){
        let result = super.toJson();
        result["title"] = this.title;
        result["contexts"] = this.contexts.map((c)=>{
            switch(typeof c)
            {
                case "Memo":
                    return {type: "memo", index: doc.memos.indexOf(<Memo>c)}
                case "Quote":
                    return {type: "quote", index: doc.quotes.indexOf(<Quote>c)}
                default:
                    return c.toJson();
            }
        });
        
        return result;
    }
}