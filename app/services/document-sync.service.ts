import {Injectable, EventEmitter} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { AuthService } from './auth.service';
import { OcDocument } from '../core/oc-document';

@Injectable()
export class DocumentSyncService{
   
  authService : AuthService;
  
  private ownerId : number;
  private document : OcDocument;
  private changedAt : number = 0;
  /*
  isDirty() : boolean{
    
    if(this.ownerId == null)
    {
      return true;
    }
    else if(this.ownerId != this.authService.getUserInfo().id)
    {
      return true;
    }
    else if(this.changedAt != ){
      
    }*/
  
  /*
  getDocument() : Promise<OcDocument>{
    var needUpdate = false;
    
    
    
  }
  
  pushChange(){
    ;
  }
  */
  
}