import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'fromnow' })
export class FromNowPipe implements PipeTransform {
    transform(timestamp: number, fallback: string): any {
        if(timestamp==null) return fallback
        else return moment.unix(timestamp).fromNow();
    }
}