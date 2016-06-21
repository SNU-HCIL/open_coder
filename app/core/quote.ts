import { OcDocument } from "./oc-document";
import { Entry } from './entry';
import { Code } from './code';

export class Quote extends Entry{
    parent : OcDocument
    label: string
    codes: Code[] = []
    
    
    static fromJson(json:any, options={quoteColumnNameCandidates:["quote", "data", "sentence", "content"], codeColumnPrefixCandidates:["code", "tag", "topic"], labelColumnNameCandidates:["label", "category", "group"]}) : Quote {
        if(json != null)
        {
            //find columnName
            var quoteColumnName;
            var labelColumnName;
            var codeColumnPrefix;
            
            function findMatch(key:string, candidates:Array<string>):string{
                for(let candidate of candidates)
                {
                    if(key.toLowerCase() == candidate.toLowerCase() 
                    ||key.toLowerCase() == pluralize(candidate.toLowerCase()))
                    {
                        return key;
                    }
                }
                return null;
            }
            
            for(let key in json)
            {
                if(quoteColumnName==null)
                {
                    quoteColumnName = findMatch(key, options.quoteColumnNameCandidates);
                    if(quoteColumnName!=null) continue;
                }
                
                if(labelColumnName==null)
                {
                    labelColumnName = findMatch(key, options.labelColumnNameCandidates);
                    if(labelColumnName!=null) continue;
                }
                
                if(codeColumnPrefix==null)
                {
                    codeColumnPrefix = findMatch(key, options.codeColumnPrefixCandidates);
                    if(codeColumnPrefix!=null) continue;
                }
            }
            
            if(json[quoteColumnName]==null)
            {
                return null;
            }
            let result = new Quote();
            
            result.label = json[labelColumnName];
            result.content = json[quoteColumnName];
            
            //code parse
            for(var propertyName in json)
            {
                if(propertyName.toLowerCase().indexOf(codeColumnPrefix) ===0)
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