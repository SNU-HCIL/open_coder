import { ViewContainerRef, DynamicComponentLoader, Directive, Attribute } from '@angular/core';
import { Router, RouterOutlet, ComponentInstruction } from "@angular/router-deprecated";
import { AuthService } from './services/auth.service';

@Directive({selector: 'router-outlet'})
export class LoginRouterOutlet extends RouterOutlet{
    publicRoutes : Array<string>;
    private parentRouter : Router;

    private _pendedUrl;

    constructor( _elementRef: ViewContainerRef, _loader: DynamicComponentLoader,
    _parentRouter: Router, @Attribute('name') nameAttr: string,
    private authService: AuthService)
    {
        super(_elementRef, _loader, _parentRouter, nameAttr)

        this.parentRouter = _parentRouter;

        this.publicRoutes = ['login'];
    }

    activate(instruction: ComponentInstruction)
    {
        let url = instruction.urlPath;
        if(this.publicRoutes.indexOf(url)<0 && !this.authService.isLoggedIn())
        {   
            //not logged in and not public url
            return this.authService.validate_token().then(
                success=>{
                    if(success)
                    {
                        console.log("validation successful");
                    }
                    else{
                        this._pendedUrl = url;
                        this.parentRouter.navigateByUrl('/login');
                    }
                    return super.activate(instruction);
                }
            )
        }
        else
        {
            this._pendedUrl = null;
            return super.activate(instruction);
        }
    }

    pendedUrl(){
        return this._pendedUrl;
    }

}