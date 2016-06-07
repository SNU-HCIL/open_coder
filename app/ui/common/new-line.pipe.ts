import {Pipe, PipeTransform} from '@angular/core';
/*
 * Converts newlines into breaks
*/
@Pipe({ name: 'newline' })
export class NewLinePipe implements PipeTransform {
    transform(value: string, args: string[]): any {
        if(value==null) return ""
        else return value.replace(/(?:\r\n|\r|\n)/g, '<br />');
    }
}