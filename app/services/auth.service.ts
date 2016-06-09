//https://medium.com/@blacksonic86/authentication-in-angular-2-958052c64492#.obqxr6aiv

import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

const HOST = "http://localhost:3001";
const PATH_SIGN_IN = HOST + '/auth/sign_in';
const PATH_SIGN_OUT = HOST + '/auth/sign_out';
const PATH_RETURN = HOST + '/validate_token';

const PARAM_CLIENT = "client"
const PARAM_TOKEN = "access-token"
const PARAM_UID = "uid"
  

@Injectable()
export class AuthService{
  
  private loggedIn : boolean = false;
  
  private httpOptions = new RequestOptions( { headers: new Headers({"Content-Type": 'application/json'}) })
  
  constructor(private http:Http)
  {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }
  
  private getAuthInfo(): Object{
    let result = {}
    for(var param of [PARAM_CLIENT, PARAM_TOKEN, PARAM_UID])
    {
      result[param] = localStorage.getItem(param);
    }
    
    console.log("AuthInfo : ", result);
    
    return result;
  }
  
  private makeHeaderWithAuthInfo()
  {
    let header = new Headers({"Content-Type": 'application/json'})
    let authInfo = this.getAuthInfo();
    for(var key in authInfo)
    {
      header.append(key, authInfo[key]);
    }
    
    return new RequestOptions({ headers: header });
  }
  
  signIn(email:string, password:string) : Promise<boolean>{
    return this.http.post( PATH_SIGN_IN, JSON.stringify({email: email, password: password}), this.httpOptions)      
      .toPromise()
      .catch(error=>{ console.log(error); return false;})
      .then(response=>{
        localStorage.setItem(PARAM_CLIENT, response.headers.get(PARAM_CLIENT))
        localStorage.setItem(PARAM_UID, response.headers.get(PARAM_UID))
        localStorage.setItem(PARAM_TOKEN, response.headers.get(PARAM_TOKEN))
        
        this.loggedIn = true;
        
        return true;
        })
  }
  
  signOut() : Promise<boolean>{
    console.log(this.getAuthInfo());
    return this.http.delete(PATH_SIGN_OUT, this.makeHeaderWithAuthInfo())
      .toPromise()
      .then(response=>{
        console.log(response);
        return true;
      });
  }
  
  validate_token() : Promise<boolean>{
    //resutn this.http.post()
    return null;
  }
  
}