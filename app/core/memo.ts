import { Entry } from './entry';
import { OcDocument } from './oc-document';
import { Quote } from './quote';
import { Code } from './code';


export class Memo extends Entry{
    title: string
    contexts: Entry[] = []
    
    toJson(doc? : OcDocument){
        let result = super.toJson();
        result["title"] = this.title;
        result["contexts"] = this.contexts.map((c)=>{
            let json = {type: typeof c};
            
            switch(typeof c)
            {
                case "Memo":
                    json["index"] = doc.memos.indexOf(<Memo>c)
                    break;
                case "Quote":
                    json["index"] = doc.quotes.indexOf(<Quote>c)
                    break;
                case "Code":
                    json["content"] = (<Code>c).content;
                    break;
                default:
                    return null;
            }
            return json;
        }).filter((c)=>{return c!=null;})
        
        return result;
    }
    
    fromJson(json, doc?:OcDocument){
        super.fromJson(json)
        
        this.title = json.title;
        
        if(json.contexts != null)
        {
            this.contexts = json.contexts.map(function(cj): Entry{
                switch(typeof cj)
                {
                    case "Memo":
                        return doc.memos[cj.index];
                    case "Quote":
                        return doc.quotes[cj.index];
                    case "Code":
                        return new Code(cj.content);
                }
                return null;
            }).filter((c)=>{return c!=null;})
        }
        
        return this;        
    }
}