export class Quote{
    label: string
    content: string
    codes: string[] = []
        
    constructor(json?:any)
    {
        if(json != null)
        {
            this.label = json.label
            this.content = json.quote
        }
    }
}