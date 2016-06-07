import {OcDocument} from './oc-document';

export class Entry{
  content: string;
  timestamp: Date;
  constructor(content?: string){
    this.content = content
    this.timestamp = new Date()
  }
  
  toJson(doc?:OcDocument)
  {
    return {content: this.content, timestamp: this.timestamp.getTime()};
  }
  
  fromJson(json: any, doc?:OcDocument){
    this.content = json["content"];
    this.timestamp = new Date(json["timestamp"]+0);
    return this;
  }
}