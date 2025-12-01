import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environments';
import { HttpClient } from '@angular/common/http';
import { UserLogin, UserRegisterRequest } from '../interfaces/user-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private baseUrl = environment.apiUrl;
  private httpClient = inject(HttpClient)


  constructor() { }

  registerUser(user: UserRegisterRequest): Observable<any> {

    return this.httpClient.post<any>(`${this.baseUrl}${environment.registerEndopint}`, user)
  }


  loginUser(user: UserLogin): Observable<any> {

    return this.httpClient.post<any>(`${this.baseUrl}${environment.loginEndpoint}`, user)
  }

}
