import { Component, Input, Output, OnInit, AfterViewInit, ElementRef, EventEmitter } from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated';

import { PluralizePipe } from './ui/common/pluralize.pipe';
import { AuthService } from './services/auth.service';
import { StyleInjector, GRADIENT_BACKGROUND_STYLE } from './ui/common/style_injector';
import { TopBarComponent } from './ui/common/top-bar.component';
import { TitleComponent } from './ui/common/title.component';

@Component({
  selector: 'oc-project-page',
  styleUrls:['app/project-page.styles.css'],
  templateUrl: 'app/project-page.html',
  directives: [TitleComponent, TopBarComponent],
  pipes:[PluralizePipe]
})
export class ProjectPageComponent implements OnInit {

  private project:any;
  private bgColorInjector:StyleInjector = new StyleInjector("body", GRADIENT_BACKGROUND_STYLE);
  
  constructor(private params: RouteParams, private Router : Router, private authService: AuthService)
  {
  }

  ngOnInit()
  {
    this.bgColorInjector.apply();

    let id = +this.params.get('id');
    this.authService.getProject(id).then(result=>{
      this.project = result
    })
  }

  toAddMode(){
  }
}
    