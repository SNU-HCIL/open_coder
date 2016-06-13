export class ResizableTableColumn{
  private body$ : JQuery;
  private changingTarget$ : JQuery;
  private handle$ : JQuery;
  
  private isDragging : boolean = false;
  private dragStartX : number;
  private dragStartDeltaX : number;
  private dragStartCellWidth : number;
  private changingCells$ : JQuery;
  
  
  constructor(private rowElement, handleCellSelector, private changingTargetCellSelector)
  {
    this.body$ = jQuery(rowElement);
    this.handle$ = this.body$.find(handleCellSelector)
      .on("mousedown", e=>this.onHandleMouseDown(e))
      .on("mouseup", e=>this.onHandleMouseUp(e))
      
    this.changingTarget$ = this.body$.find(changingTargetCellSelector);
  }
  
  private onHandleMouseDown(event : JQueryMouseEventObject){
    event.stopPropagation();
    console.log("mousedown on ", event.clientX, event.clientY);    
    this.startDrag(event.clientX, event.clientY);
    
  }
  
  private startDrag(x:number, y:number){
    this.isDragging = true;
    jQuery(window).on("mouseup", e=>{event.stopPropagation();this.finishDrag()})
    jQuery(window).on("mousemove", (e:JQueryMouseEventObject)=>{event.stopPropagation();this.drag(e.clientX, e.clientY)})
    
    this.dragStartX = x;
    this.dragStartDeltaX = this.handle$.offset().left - this.dragStartX;
    this.dragStartCellWidth = this.changingTarget$.width();
    this.changingCells$ = this.body$.closest("table").find(this.changingTargetCellSelector);
    console.log(this.dragStartDeltaX);
  }
  
  private onHandleMouseUp(event : JQueryMouseEventObject){
    event.stopPropagation();
    this.finishDrag();
  }
  
  private drag(x:number, y:number){
    this.changingCells$.css("width", this.dragStartCellWidth + (x - this.dragStartX + this.dragStartDeltaX));
  }
  
  private finishDrag(){
    console.log("finish drag")
    jQuery(window).off("mouseup");
    jQuery(window).off("mousemove");
  }
  
}