import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'pluralize' })
export class PluralizePipe implements PipeTransform {
    transform(times: number, word:string, showCount:boolean=true): any {
        if(times==null) return ""
        else return pluralize(word, times, showCount);
    }
}