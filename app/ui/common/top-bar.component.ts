import { Component, Input } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { AuthService } from '../../services/auth.service';
import { UserInfo } from '../../core/user-info';

@Component({
  selector: 'oc-top-bar',
  styleUrls: ['app/ui/common/top-bar.styles.css'],
  template: `
    <div id="top_bar" >
        <div class="logo">
          <img src="app/assets/logo_dark.svg">
        </div>
        <div *ngIf="userInfo" class="user_panel">
          <table>
            <tr>
              <td class="user_info_cell">
                <span class="name">
                  {{userInfo.name}}
                </span>
              </td>
              <td>
                <button class="normal" (click)="logout()">Logout</button>
              </td>
            </tr>
          </table>
          
        </div>
    </div>
    `,
})
export class TopBarComponent {
    userInfo : UserInfo;
    
    constructor(private authService : AuthService, private router: Router)
    {
      authService.userInfoObservable.subscribe(userInfo=>{
        this.userInfo = userInfo;
        console.log(this.userInfo)
      })
    }
    
    logout(){
      this.authService.signOut().then(res=>{
        if(res==true)
        {
          this.userInfo = null;
          this.router.navigate(["Login"]);
        }
      })
    }
}