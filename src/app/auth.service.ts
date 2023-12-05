import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { share } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: any;
  user: any;


  constructor(private http: HttpClient) {
    let token = localStorage.getItem('token');
    if(token) this.token = JSON.parse(token);

    let user = localStorage.getItem('user');
    if(user) this.user = JSON.parse(user);
  }

  registration(username: string, password: string, lastName?: string, firstName?: string) {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const data = {
      email: username,
      password: password,
      lastName: lastName,
      firstName: firstName,
    };

    let token = this.http
      .post('http://localhost:3777/auth/signup', JSON.stringify(data), { headers })
      .pipe(share())

    token.subscribe((response) => {
      this.token = response;
      localStorage.setItem('token', JSON.stringify(this.token['access_token']));
    });
    
    return token;
  }
    /* ------------------------------------ */

  login(username: string, password: string) {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const data = {
      email: username,
      password: password,
    };

    let token = this.http
      .post('http://localhost:3777/auth/signin', JSON.stringify(data), { headers })
      .pipe(share())

    token.subscribe((response) => {
      this.token = response;
      localStorage.setItem('token', JSON.stringify(this.token['access_token']));
    });
    
    return token;
  }
    /* ------------------------------------ */
  
  getUser(tok: any) {
    const headers2 = new HttpHeaders().set('Authorization', 'Bearer ' + tok['access_token']);

    let user = this.http
      .get('http://localhost:3777/users/me', { headers: headers2 })
      .pipe(share());

    user.subscribe((response) => {
      this.user = response;
      localStorage.setItem('user', JSON.stringify(this.user));
    });

    return user;
  }

  logout() {
    this.token = undefined;
    localStorage.removeItem('token');
    this.user = undefined;
    localStorage.removeItem('user');
  }
  
}
