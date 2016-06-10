import { Injectable } from '@angular/core';

@Injectable()
export class VisualizationInformationService{
    palette = ["#119eb7", "#815e85", "#d0533d", "#cea953", "#91d44b", "#cd5b89", "#797ecb", "#fb8072","#72422f"];
    
    getCategoricalColor(index: number) : string{
        return this.palette[index%this.palette.length];
    }
}