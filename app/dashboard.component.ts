import { Component, Input, Output, OnInit, AfterViewInit, ElementRef, EventEmitter } from '@angular/core';
import { PluralizePipe } from './ui/common/pluralize.pipe';
import { AuthService } from './services/auth.service';
import { StyleInjector, GRADIENT_BACKGROUND_STYLE } from './ui/common/style_injector';
import { TopBarComponent } from './ui/common/top-bar.component';
import { TitleComponent } from './ui/common/title.component';

@Component({
  selector: 'oc-dashboard',
  styleUrls:['app/dashboard.styles.css'],
  templateUrl: 'app/dashboard.html',
  directives: [TitleComponent, TopBarComponent],
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