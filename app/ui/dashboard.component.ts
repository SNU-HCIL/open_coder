import { Component, Input, Output, OnInit, AfterViewInit, ElementRef, EventEmitter } from '@angular/core';
import { PluralizePipe } from './common/pluralize.pipe';
import { AuthService } from '../services/auth.service';
import { StyleInjector, GRADIENT_BACKGROUND_STYLE } from './common/style_injector';
import {TitleComponent} from './common/title.component';

@Component({
  selector: 'oc-dashboard',
  styleUrls:['app/ui/dashboard.styles.css'],
  templateUrl: 'app/ui/dashboard.html',
  directives: [TitleComponent],
  pipes:[PluralizePipe]
})
export class DashboardComponent implements OnInit {
    
    private projects : Array<any>;

    private addMode : boolean = false;
    
    private bgColorInjector:StyleInjector = new StyleInjector("body", GRADIENT_BACKGROUND_STYLE);

    newProjectName : string;
    newProjectDescription : string;

    constructor(private elementRef : ElementRef, private authService: AuthService)
    {
    }

    ngOnInit(){
        this.authService.getProjects().then(res=>{
            this.projects = res;
        })
        
        this.bgColorInjector.apply();
    }

    toAddMode(){
        this.addMode = true;
    }

    endAddMode(){
        this.newProjectDescription = ""
        this.newProjectName = ""
        this.addMode = false;
    }

    createNewProject()
    {
        console.log(this.newProjectName + ", " + this.newProjectDescription);
        this.authService.addNewProject(this.newProjectName, this.newProjectDescription)
            .then(res=>{
                if(res != -1)
                {
                    this.projects.push({id: res, name: this.newProjectName, description: this.newProjectDescription, documents:[]})
                    this.endAddMode();
                }
            })
    }
    
    
    
}