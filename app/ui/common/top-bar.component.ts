import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';

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
              <td>
                {{userInfo.name}}
              </td>
              <td>
                <button class="normal">Logout</button>
              </td>
            </tr>
          </table>
          
        </div>
    </div>
    `,
})
export class TopBarComponent {
    @Input() userInfo : any;
    
    constructor(private authService : AuthService)
    {
      
    }
    
    logout(){
      this.authService.signOut().then()
    }
}