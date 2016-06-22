import { Component, Input, Output, OnInit, OnDestroy, AfterViewInit, ElementRef, EventEmitter } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { PluralizePipe } from './ui/common/pluralize.pipe';
import { AuthService } from './services/auth.service';
import { StyleInjector, GRADIENT_BACKGROUND_CLASS } from './ui/common/style_injector';
import { TitleComponent } from './ui/common/title.component';

@Component({
  selector: 'oc-dashboard',
  styleUrls:['app/dashboard.styles.css'],
  templateUrl: 'app/dashboard.html',
  directives: [TitleComponent],
  pipes:[PluralizePipe]
})
export class DashboardComponent implements OnInit, OnDestroy {
    
    private isLoading = true;    

    private projects : Array<any>;

    private addMode : boolean = false;
    
    private bgColorInjector:StyleInjector = new StyleInjector("body", [GRADIENT_BACKGROUND_CLASS]);

    newProjectName : string;
    newProjectDescription : string;

    constructor(private elementRef : ElementRef, private authService: AuthService, private router: Router)
    {
    }

    ngOnInit(){
        this.authService.getProjects().then(res=>{
            this.projects = res;
            this.isLoading = false;
        })
        
        this.bgColorInjector.apply();
    }

    ngOnDestroy(){
        this.bgColorInjector.restore();
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
    
    openProject(_id){
        this.router.navigate(['Project', {id: _id}])
    }
    
}