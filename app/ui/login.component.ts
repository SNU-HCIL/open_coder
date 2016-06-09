import { Component, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'oc-coder',
  styleUrls: ['app/ui/login.styles.css'],
  templateUrl: 'app/ui/login.html',
  directives: []
})
export class LoginComponent {
  
  private email: string;
  private password: string;
  
  private remember: boolean;
  
  constructor(private authService : AuthService)
  {
    
  }
  
  login()
  {
  }
  
}