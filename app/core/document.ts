import { Quote } from './quote';

export class Document{
  name: string;
  quotes: Quote[]
    
  constructor(){
    this.quotes = [];
  }
}