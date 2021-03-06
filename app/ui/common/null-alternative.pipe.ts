import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: "nullAlternative"})
export class NullAlternativePipe implements PipeTransform{
    transform(value: any, alternative: any) : any{
        if(value != "" && value != null) 
            return value;
        else return alternative; 
    }
}