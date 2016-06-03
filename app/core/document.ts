import { Quote } from './quote';

export class Document{
  name: string;
  quotes: Quote[]
  labels: string[]
  codeCounts: Array<{code:string, count:number}>
    
  constructor(){
    this.quotes = [];
    this.codeCounts = [];
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
    let codes = []
    for(var codeArr of this.quotes.map((quote)=>{return quote.codes}))
    {
      codes = codes.concat(codeArr);
    }
    
    for(var code of codes)
    {
      var codeCount = this.codeCounts.find((v)=>{return v.code === code})
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
}