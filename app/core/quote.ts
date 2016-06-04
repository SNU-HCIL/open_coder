import { Document, Entry } from "./document";

export class Quote extends Entry{
    parent : Document
    label: string
    codes: Entry[] = []
    
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
                    result.codes.push({content:code});
                }
            }
            
            return result
        }
        else return null;
    }
}