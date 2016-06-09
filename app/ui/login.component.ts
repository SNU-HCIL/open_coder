import { Component, Input } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'oc-coder',
  styleUrls: ['app/ui/login.styles.css'],
  templateUrl: 'app/ui/login.html',
  directives: []
})
export class LoginComponent {
  private remember: boolean;
  
  constructor(private authService : AuthService, private router: Router)
  {
    
  }
  
  login(event, email, password)
  {
    event.preventDefault();
    console.log("attempt login as : ", email)
    this.authService.signIn(email, password).then(success=>
      {
        console.log(success)
        this.router.navigate(['Dashboard']).then(res=>{console.log(res)});
      });
  }
  
}