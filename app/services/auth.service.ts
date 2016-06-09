//https://medium.com/@blacksonic86/authentication-in-angular-2-958052c64492#.obqxr6aiv

import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

const HOST = "http://localhost:3001";
const PATH_SIGN_IN = HOST + '/auth/sign_in';
const PATH_SIGN_OUT = HOST + '/auth/sign_out';
const PATH_RETURN = HOST + '/auth/validate_token';

//API paths
const PATH_GET_USER_PROJECTS = HOST + "/api/prjs";
const PATH_NEW_PROJECT = HOST + "/api/prj/new";



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

  public isLoggedIn(): boolean{
    return this.loggedIn;
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

  private makeDefaultOptions(){
    let header = new Headers({"Content-Type": 'application/json'})
    let authInfo = this.getAuthInfo();

    let options=  new RequestOptions({ headers: header, search: new URLSearchParams() });
    for(var key in authInfo)
    {
      options.search.set(key, authInfo[key]);
    }

    return options;
  }
  
  signIn(email:string, password:string) : Promise<boolean>{
    return this.http.post( PATH_SIGN_IN, JSON.stringify({email: email, password: password}), this.httpOptions)      
      .toPromise()
      .catch(error=>{ console.log(error); return false;})
      .then(response=>{
        console.log("devise login success")
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
  
  validateToken() : Promise<boolean>{

    return this.http.get(PATH_RETURN, this.makeDefaultOptions())
      .toPromise()
      .then(response=>{
        console.log(response);
        return true;
      })
      .catch(error=>{
        console.log(error);
        return false;
      })
  }

  getProjects() : Promise<any>{
    let options = this.makeDefaultOptions();
    return this.http.get(PATH_GET_USER_PROJECTS, options)
      .toPromise()
      .then(res=>{
        console.log(res.json().result)
        if(res.json().success==true)
        {
          return res.json().result;
        }
        return null;
      })
  }

  addNewProject(_name:string, _description:string) : Promise<number>{
    let options = this.makeDefaultOptions();
    options.search.set("args", JSON.stringify({name: _name, description: _description}));

    return this.http.put(PATH_NEW_PROJECT, "", options)
      .toPromise()
      .then(res=>{
        let json = res.json();
        if(json.success==true)
        {
          return json.result.id;
        }else{
          return -1;
        }
      })
  }

  
}