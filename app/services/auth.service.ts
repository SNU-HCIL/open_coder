//https://medium.com/@blacksonic86/authentication-in-angular-2-958052c64492#.obqxr6aiv

import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { UserInfo } from '../core/user-info';

const HOST = "http://localhost:3001";
const PATH_SIGN_IN = HOST + '/auth/sign_in';
const PATH_SIGN_OUT = HOST + '/auth/sign_out';
const PATH_RETURN = HOST + '/auth/validate_token';

//API paths
const PATH_GET_USER_PROJECTS = HOST + "/api/prjs";
const PATH_NEW_PROJECT = HOST + "/api/prj/new";
const PATH_PROJECT_DETAIL = HOST + "/api/prj";
const PATH_CREATE_DOCUMENT = HOST + "/api/doc/new";
const PATH_DOCUMENT_DETAIL = HOST + "/api/doc";

const PARAM_CLIENT = "client"
const PARAM_TOKEN = "access-token"
const PARAM_UID = "uid"
const PARAM_USERINFO = "userinfo"

@Injectable()
export class AuthService{
  
  private loggedIn : boolean = false;
  
  private userInfoSource = new BehaviorSubject<UserInfo>(null);
  userInfoObservable = this.userInfoSource.asObservable();

  private httpOptions = new RequestOptions( { headers: new Headers({"Content-Type": 'application/json'}) })

  constructor(private http:Http)
  {
    this.loggedIn = false //!!localStorage.getItem(PARAM_TOKEN);
    if(this.loggedIn==true)
    {
      this.updateUserInfo(JSON.parse(localStorage.getItem(PARAM_USERINFO)));
    }
  }

  private updateUserInfo(json){
    console.log("UserInfo will be updated - ", json.data)
    this.userInfoSource.next(new UserInfo(json.data));
  }

  public isLoggedIn(): boolean{
    return this.loggedIn;
  }

  public getUserInfo() : UserInfo{
    return this.userInfoSource.getValue();
  }
  
  private getAuthInfo(): Object{
    let result = {}
    for(var param of [PARAM_CLIENT, PARAM_TOKEN, PARAM_UID])
    {
      result[param] = localStorage.getItem(param);
    }
    
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
        localStorage.setItem(PARAM_USERINFO, JSON.stringify(response.json()));
        this.updateUserInfo(response.json());

        this.loggedIn = true;
        
        return true;
        })
  }
  
  signOut() : Promise<boolean>{
    return this.http.delete(PATH_SIGN_OUT, this.makeHeaderWithAuthInfo())
      .toPromise()
      .then(response=>{
        console.log(response);

        localStorage.removeItem(PARAM_CLIENT)
        localStorage.removeItem(PARAM_UID)
        localStorage.removeItem(PARAM_TOKEN)
        localStorage.removeItem(PARAM_USERINFO)


        if(response.json().success==true)
        {

          return true;
        }
        else{          
          return false;
        }
      });
  }
  
  validateToken() : Promise<boolean>{

    return this.http.get(PATH_RETURN, this.makeDefaultOptions())
      .toPromise()
      .then(response=>{
        console.log(response);
        localStorage.setItem(PARAM_USERINFO, JSON.stringify(response.json()));
        this.updateUserInfo(response.json());
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

  removeProject(id:number) : Promise<boolean>{
    return null;
  }

  getProject(_id:number): Promise<any>{
    let options = this.makeDefaultOptions();
    options.search.set("args", JSON.stringify({"id": _id}));
    
    return this.http.get(PATH_PROJECT_DETAIL, options)
      .toPromise()
      .then(result=>{
        return result.json().result
      })
  }

  createDocument(_project_id:number, _name:string, _description:string, _memos:any, _quotes:any)
  {
    let options = this.makeDefaultOptions();
    return this.http.put(PATH_CREATE_DOCUMENT, JSON.stringify({args:{project_id: _project_id, name: _name, description: _description, memos: _memos, quotes: _quotes}}), options)
      .toPromise()
      .then(res=>{
        return res.json().result;
      })
  }

  getDocument(_id:number): Promise<any>{
    let options = this.makeDefaultOptions();
    options.search.set("args", JSON.stringify({"id": _id}));
    
    return this.http.get(PATH_DOCUMENT_DETAIL, options)
      .toPromise()
      .then(result=>{
        return result.json().result
      })
  }
  
}