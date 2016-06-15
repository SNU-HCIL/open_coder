import { Component, Input, AfterViewInit, ElementRef } from '@angular/core';
import {TitleComponent} from '../ui/common/title.component';
import { OcDocument } from '../core/oc-document';
import {VisualizationInformationService} from '../services/visualization-information.service';


@Component({
  selector: 'tr.code_summary_row',
  styles: [`
    th{
      text-align: left;
      padding:8px 6px;
    }

    th, td{
        border-bottom: 1px solid rgba(0,0,0,0.07);
    }

    td{
        padding: 0px 3px;
    }
  `],
  template: `
    <th>
      {{codeCount.code}}
    </th>
    <td>
      {{codeCount.count}}
    </td>
  `,
  directives: [TitleComponent]
})
export class CodeSummaryRowComponent implements AfterViewInit {
    @Input() codeCount
    @Input() doc : OcDocument
    
    private self$ : JQuery
    
    constructor(private elmRef : ElementRef, private visualizationInformationService: VisualizationInformationService)
    {
      
    }
    
    ngAfterViewInit(){
      this.self$ = jQuery(this.elmRef.nativeElement)
      this.self$.qtip({
        show: {
          solo: true
        },
        content: {text: ()=>{return this.buildTooltipContent();}},
        position: {
          my: 'center right',
          at: 'center left',
          viewport: jQuery(window)
        }
      })
    }
    
    buildTooltipContent(){
      let table = jQuery("<table></table>").attr("class", "tooltip_content_table").css("border-spacing", "8px");
      table.append(`<h3>${pluralize("Quote", this.codeCount.count)} with Code</h3>`)
      for(let quote of this.doc.quotesByCode(this.codeCount.code))
      {
        let row = jQuery(`<tr><td class="category"></td><td class="quote">${quote.content}</td></tr>`)
        row.find("td.category")
          .css("width", "2px")
          .css("background", ()=>this.visualizationInformationService.getCategoricalColor(quote.parent.labels.indexOf(quote.label)));
                
        row.find("td.quote")
          .css("padding", "2px 4px")
          .css("font-size", "11px")
          .css("font-weight","bold")
          .css("color", "#575757");
          
        table.append(row)
      }
      
      return table.prop('outerHTML')
      
    }
}


@Component({
  selector: 'oc-code-summary',
  styleUrls: ['app/coder/code-summary.css'],
  templateUrl: 'app/coder/code-summary.html',
  directives: [TitleComponent, CodeSummaryRowComponent]
})
export class CodeSummaryComponent {
    @Input() doc : OcDocument;
    
    onHover(code: string){
    }
}