import { OcDocument } from "./oc-document";
import { Entry } from './entry';
import { Code } from './code';

export class Quote extends Entry{
    parent : OcDocument
    label: string
    codes: Code[] = []
    
    
    static fromJson(json?:any) : Quote {
        if(json != null)
        {
            if(json.quote==null || json.quote == null)
            {
                return null;
            }
            let result = new Quote();
            
            result.label = json.label
            result.content = json.quote
            
            //code parse
            for(var propertyName in json)
            {
                if(propertyName.toLowerCase().indexOf("code") ===0)
                {
                    let code = json[propertyName];
                    if(code != null && code != "")
                    result.codes.push(new Code(code));
                }
            }
            
            return result
        }
        else return null;
    }
    
    toJson(){
        let result = super.toJson();
        result["label"] = this.label;
        result["codes"] = this.codes.map((c)=>{return c.toJson()});
        return result;
    }
    
    fromJson(json: any){
        super.fromJson(json);
        this.label = json.label;
        this.codes = json.codes.map((cj)=>{ return new Code().fromJson(cj)});
        return this;
    }
}