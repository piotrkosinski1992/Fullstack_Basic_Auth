import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions,Response} from '@angular/http';
import {User} from "../model/model.user";
import 'rxjs/add/operator/map';
import {AppComponent} from "../app.component";
import { HttpHeaders, HttpClient } from '@angular/common/http';
@Injectable()
export class AuthService {
  constructor(public http: HttpClient) { }

  public logIn(user: User){

    let headers = new Headers();
    headers.append('Accept', 'application/json')
    // creating base64 encoded String from user name and password
    var base64Credential: string = btoa( user.username+ ':' + user.password);
    headers.append("Authorization", "Basic " + base64Credential);

    let options = new RequestOptions();
    options.headers=headers;

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Basic ' + base64Credential
      })
    };
    

    return this.http.get(AppComponent.API_URL+"/account/login" ,   httpOptions)
      .map((response: Response) => {
      // login successful if there's a jwt token in the response
      
      let resources = response["principal"];

        // store user details  in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(resources));
      
    });
  }

  logOut() {
    // remove user from local storage to log user out
    return this.http.post(AppComponent.API_URL+"logout",{})
      .map((response: Response) => {
        localStorage.removeItem('currentUser');
      });

  }
}
