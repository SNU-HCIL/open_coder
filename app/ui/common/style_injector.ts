export const GRADIENT_BACKGROUND_STYLE = 
  [{prop:"background", value: "#342b40"},
   {prop:"background", value: "-moz-linear-gradient(-45deg,  #342b40 0%, #6f3831 100%)"},
   {prop:"background", value: "-webkit-linear-gradient(-45deg,  #342b40 0%,#6f3831 100%)"},
   {prop:"background", value: "linear-gradient(135deg,  #342b40 0%,#6f3831 100%)"},
   {prop:"filter", value: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#342b40', endColorstr='#6f3831',GradientType=1 )"}]
   
export const GRADIENT_BACKGROUND_CLASS = 'gradient_background';

export class StyleInjector{
  constructor(private selector: string, private classes?:string[], private styles?:Array<{prop:string, value:string}>)
  {
    
  }
  
  apply(){
    let obj$ = jQuery(this.selector);
    if(this.styles)
    {
      obj$.attr("style", this.styles.map((s)=>{return s.prop + ":" + s.value}).join(";"));
    }

    if(this.classes)
    {
      for(let className of this.classes)
      {
        obj$.addClass(className);
      }
    }
  }

  restore(){
    let obj$ = jQuery(this.selector);

    if(this.styles)
      obj$.attr("style", "");

    if(this.classes)
    {
      for(let className of this.classes)
      {
        obj$.removeClass(className);
      }
    }
  }


}