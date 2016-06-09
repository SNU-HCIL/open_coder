import { Component, Input, Output, OnInit, ElementRef, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'oc-dashboard',
  styleUrls:['app/ui/dashboard.styles.css'],
  templateUrl: 'app/ui/dashboard.html',
  directives: []
})
export class DashboardComponent implements OnInit {
    
    private projects : Array<any>;

    private addMode : boolean = false;

    newProjectName : string;
    newProjectDescription : string;

    constructor(private elementRef : ElementRef, private authService: AuthService)
    {
    }

    ngOnInit(){
        this.authService.getProjects().then(res=>{
            this.projects = res;
        })
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