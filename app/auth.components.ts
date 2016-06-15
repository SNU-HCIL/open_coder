import { Component, Input } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { AuthService } from './services/auth.service';

/////////////////////////////////////////////////////////////////////////////////////////////////////
@Component({
  selector: 'oc-login',
  styleUrls: ['app/auth.styles.css'],
  templateUrl: 'app/auth-login.html',
  directives: [ROUTER_DIRECTIVES]
})
export class LoginComponent {
  private remember: boolean;
  
  private mode = "login"
  
  private information : {name:string, nickname:string, email:string, password:string, password_confirmation:string} =
    {name:null, nickname:null, email:null, password:null, password_confirmation:null}
  
  constructor(private authService : AuthService, private router: Router)
  {
    
  }
  
  onSubmit(event)
  {
    event.preventDefault();
    console.log(this.information);
    switch(this.mode)
    {
      case "login":
        this.login(this.information.email, this.information.password)
      break;
      case "signup":
        this.signUp(this.information.email, this.information.password, this.information.password_confirmation, this.information.name, this.information.nickname)
      break;
    }
  }
  
  login(email, password)
  {
    console.log("attempt login as : ", email)
    this.authService.signIn(email, password).then(success=>
      {
        console.log(success)
        this.router.navigate(['Dashboard']).then(res=>{console.log(res)});
      });
  }
  
  signUp(email, password, password_confirmation, name, nickname)
  {
    console.log("signup", email, password, password_confirmation, name, nickname);
    
    this.authService.signUp(email, password, password_confirmation, name, nickname).then(success=>
      {
        if(success==true)
        { 
          this.router.navigate(['Dashboard']).then(res=>{console.log(res)});
        }
      });
  }
  
  toggleMode(){
    if(this.mode == "signup")
    {
      this.mode = "login"
    }
    else{
      this.mode = "signup"
    }
  }
  
}