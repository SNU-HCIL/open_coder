import { Component, Input, Output, OnInit, OnDestroy, AfterViewInit, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { PluralizePipe } from './ui/common/pluralize.pipe';
import { AuthService } from './services/auth.service';
import { StyleInjector, GRADIENT_BACKGROUND_CLASS } from './ui/common/style_injector';
import { TitleComponent } from './ui/common/title.component';
import { ModalDialogComponent } from './ui/common/modal-dialog.component';

@Component({
  selector: 'oc-dashboard',
  styleUrls:['app/dashboard.styles.css'],
  templateUrl: 'app/dashboard.html',
  directives: [TitleComponent, ModalDialogComponent],
  pipes:[PluralizePipe]
})
export class DashboardComponent implements OnInit, OnDestroy {    
    private isLoading = true;    

    @ViewChild('alertModal') alertModal: ModalDialogComponent;

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

    onRemoveProjectClicked(event, id:number)
    {
        event.stopPropagation();
        this.alertModal.show({message:"Do you want to remove this project?", showOkButton: true, showCancelButton: true, 
        okHandler: ()=>{
            this.authService.removeProject(id).then((result)=>{
                let index = this.projects.indexOf(this.projects.find((d)=>d.id == result.id));
                this.projects.splice(index, 1);
            })
        }});
    }
}