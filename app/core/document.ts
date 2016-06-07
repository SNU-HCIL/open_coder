import { Quote } from './quote';
import { Memo } from './memo';
import { Code } from './code';

export class Entry{
  content: string;
  timestamp: Date;
  constructor(content?: string){
    this.content = content
    this.timestamp = new Date()
  }
}

export class Document{
  name: string;
  quotes: Quote[]
  labels: string[]
  codeCounts: Array<{code:Code, count:number}>
  
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
    let codes = new Array<Entry>()
    for(var codeArr of this.quotes.map((quote)=>{return quote.codes}))
    {
      codes = codes.concat(codeArr);
    }
    
    for(var code of codes)
    {
      var codeCount = this.codeCounts.find((v)=>{return v.code.content === code.content})
      if(codeCount!= null)
      {
        codeCount.count++;
      }
      else{
        codeCount = {code: code, count: 1}
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
}