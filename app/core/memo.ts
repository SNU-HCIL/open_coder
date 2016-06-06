import { Entry } from './document';

export class Memo extends Entry{
    title: string
    contexts: Entry[]
}