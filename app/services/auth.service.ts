//https://medium.com/@blacksonic86/authentication-in-angular-2-958052c64492#.obqxr6aiv

import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { UserInfo } from '../core/user-info';

import { OcDocument } from '../core/oc-document';

const HOST = "http://147.46.242.147:3002";

// Authentication
const PATH_SIGN_UP = HOST + '/auth';
const PATH_SIGN_IN = HOST + '/auth/sign_in';
const PATH_SIGN_OUT = HOST + '/auth/sign_out';
const PATH_RETURN = HOST + '/auth/validate_token';

// API paths
const PATH_GET_USER_PROJECTS = HOST + "/api/prjs";
const PATH_NEW_PROJECT = HOST + "/api/prj/new";
const PATH_REMOVE_PROJECT = HOST + "/api/prj/rm";
const PATH_PROJECT_DETAIL = HOST + "/api/prj";
const PATH_CREATE_DOCUMENT = HOST + "/api/doc/new";
const PATH_DOCUMENT_DETAIL = HOST + "/api/doc";
const PATH_REMOVE_DOCUMENT = HOST + "/api/doc/rm";
const PATH_UPDATE_DOCUMENT_DETAIL = HOST + "/api/doc/update";

// Parameters
const PARAM_CLIENT = "client"
const PARAM_TOKEN = "access-token"
const PARAM_TOKEN_TYPE = "token-type"
const PARAM_EXPIRY = "expiry"
const PARAM_UID = "uid"
const PARAM_USERINFO = "userinfo"

const PARAMS_TOKEN_FORMAT = [PARAM_CLIENT, PARAM_TOKEN, PARAM_TOKEN_TYPE, PARAM_UID, PARAM_EXPIRY]

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
    for(var param of PARAMS_TOKEN_FORMAT)
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
  
  private handleResponseToken(response)
  {
    //console.log(response);
    if(response.headers.get(PARAM_TOKEN) != null)
    {
      //console.log("token will be refreshed. - ", response.headers.get(PARAM_TOKEN));
      for(let param of PARAMS_TOKEN_FORMAT)
      {
        let value = response.headers.get(param)
        if(value != null && value != "")
        {        
          localStorage.setItem(param, response.headers.get(param));
        }
      }
    }
  }
  
  signIn(email:string, password:string) : Promise<boolean>{
    return this.http.post( PATH_SIGN_IN, JSON.stringify({email: email, password: password}), this.httpOptions)      
      .toPromise()
      .catch(error=>{ console.log(error); return false;})
      .then(response=>{
        console.log("devise login success")
        
        this.handleResponseToken(response);
        
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
  
  signUp(email, password, password_confirmation, name, nickname) : Promise<boolean>{
    return this.http.post( PATH_SIGN_UP, 
        JSON.stringify({
          email: email, 
          password: password, 
          password_confirmation: password_confirmation, 
          name: name, 
          nickname: nickname,
          confirm_success_url: "http://localhost:3000/confirmed"
        }), this.httpOptions
      )      
      .toPromise()
      .catch(error=>{ console.log(error); return false;})
      .then(response=>{
        console.log("devise signup success")
        
        this.handleResponseToken(response);
        console.log(response.json());
        return true;
        })
  }
  
  validateToken() : Promise<boolean>{

    return this.http.get(PATH_RETURN, this.makeDefaultOptions())
      .toPromise()
      .then(response=>{
        console.log(response);
        this.handleResponseToken(response);
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
        this.handleResponseToken(res);
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
        this.handleResponseToken(res);
        let json = res.json();
        if(json.success==true)
        {
          return json.result.id;
        }else{
          return -1;
        }
      })
  }

  removeProject(_id:number) : Promise<any>{
    let options = this.makeDefaultOptions();
    options.search.set("args", JSON.stringify({"id": _id}));
    
    return this.http.delete(PATH_REMOVE_PROJECT, options)
      .toPromise()
      .then(res=>{
        this.handleResponseToken(res);
        return res.json().result
      })
  }

  getProject(_id:number): Promise<any>{
    let options = this.makeDefaultOptions();
    options.search.set("args", JSON.stringify({"id": _id}));
    
    return this.http.get(PATH_PROJECT_DETAIL, options)
      .toPromise()
      .then(res=>{
        this.handleResponseToken(res);
        console.log(res.json())
        return res.json().result
      })
  }

  createDocument(_project_id:number, _name:string, _description:string, _memos:any, _quotes:any)
  {
    let options = this.makeDefaultOptions();
    return this.http.put(PATH_CREATE_DOCUMENT, JSON.stringify({args:{project_id: _project_id, name: _name, description: _description, memos: _memos, quotes: _quotes}}), options)
      .toPromise()
      .then(res=>{
        this.handleResponseToken(res);
        return res.json().result;
      })
  }

  getDocument(_id:number): Promise<any>{
    let options = this.makeDefaultOptions();
    options.search.set("args", JSON.stringify({"id": _id}));
    
    return this.http.get(PATH_DOCUMENT_DETAIL, options)
      .toPromise()
      .then(res=>{
        this.handleResponseToken(res);
        return res.json().result
      })
  }
  
  removeDocument(_id:number): Promise<any>{
    let options = this.makeDefaultOptions();
    options.search.set("args", JSON.stringify({"id": _id}));
    
    return this.http.delete(PATH_REMOVE_DOCUMENT, options)
      .toPromise()
      .then(res=>{
        this.handleResponseToken(res);
        return res.json().result
      })
  }
  
  updateDocumentDetail(_id:number, doc: OcDocument){
    let json = doc.toSerializedJson();
    return this.http.post( PATH_UPDATE_DOCUMENT_DETAIL, 
      JSON.stringify({args:{id:_id, memos: JSON.stringify(json.memos), quotes: JSON.stringify(json.quotes)}}), this.makeHeaderWithAuthInfo())      
      .toPromise()
      .catch(error=>{ console.log(error); return false;})
      .then(response=>{
        this.handleResponseToken(response);
        return response.json().result;
      }
      );
  }
  
  
}
