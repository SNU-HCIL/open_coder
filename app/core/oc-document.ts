import { Entry } from './entry';
import { Quote } from './quote';
import { Memo } from './memo';
import { Code } from './code';

export class OcDocument{
  name: string;
  description: string;
  quotes: Quote[]
  labels: string[]
  codeCounts: Array<{code:string, count:number}>
  
  memos : Memo[]
    
  constructor(){
    this.quotes = [];
    this.codeCounts = [];
    this.memos = [];
  }
  
  quotesByLabel(label: string) : Quote[]
  {
    return this.quotes.filter((q)=>{return q.label === label;})
  }
  
  quotesByCode(code: string) : Quote[]
  {
    return this.quotes.filter((q)=>{return q.codes.filter((c)=>{return c.content == code}).length > 0; });
  }
  
  
  update(){
    
    //apply parent
    for(var quote of this.quotes)
    {
      quote.parent = this;
    }
    
    this.labels = this.quotes.map((quote)=>{return quote.label}).reduce(function(a,b){
	    if (a.indexOf(b) < 0 ) a.push(b);
	    return a;
      },[]);
    
    this.codeCounts = []
    let codes = new Array<Code>()
    for(var codeArr of this.quotes.map((quote)=>{return quote.codes}))
    {
      codes = codes.concat(codeArr);
    }
    
    for(var code of codes)
    {
      var codeCount = this.codeCounts.find((v)=>{return v.code === code.content})
      if(codeCount!= null)
      {
        codeCount.count++;
      }
      else{
        codeCount = {code: code.content, count: 1}
        this.codeCounts.push(codeCount);
      }
    }
    
    this.codeCounts.sort(function(a, b){
      if(a.count>b.count)
      {
        return -1;
      }
      else if(a.count < b.count){
        return 1;
      }
      else return 0;
    });
  }
  
  toCsvString(): string{
    var maxNumCodes = 0;
    for(var quote of this.quotes)
    {
      maxNumCodes = Math.max(quote.codes.length, maxNumCodes);
    }
    
    var compiledJson = []
    var fields = ["label", "quotes"]
    for(var codeIndex = 0; codeIndex < maxNumCodes; codeIndex++)
    {
      fields.push(`code${codeIndex==0? "":codeIndex}`)    
    }
    
    for(var quote of this.quotes)
    {
      let obj = [quote.label, quote.content]
      for(var code of quote.codes)
      {
        obj.push(code.content);
      }
      
      compiledJson.push(obj)
    }
    
    return Papa.unparse({fields: fields, data: compiledJson}, {quotes: true, delimiter: ",", newline: "\r\n"});
  }
  
  toSerializedJson(){
    return {name: this.name, description: this.description, memos: this.memos.map((m)=>{return m.toJson(this)}), quotes: this.quotes.map((q)=>{return q.toJson()})}
  }
  
  static fromJson(json: any){
    let result = new OcDocument();
    result.name = json.name;
    result.description = json.description;

    if(json.quotes != null)
    {
      result.quotes = json.quotes.map((qj)=>{
        let q = new Quote().fromJson(qj);
        q.parent = result;
        return q;
      });
    }
    
    if(json.memos != null)
    {
      result.memos = json.memos.map((mj)=>{
        return new Memo().fromJson(mj);
      });
    }
    
    result.update();
    
    return result;
  }
  
}