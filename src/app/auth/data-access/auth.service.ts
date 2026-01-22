import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environments';
import { HttpClient } from '@angular/common/http';
import { UserLogin, UserRegisterRequest } from '../interfaces/user-request';
import { Observable } from 'rxjs';
import { UserResponse } from '../interfaces/user-response';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private baseUrl = environment.apiUrl;
  private httpClient = inject(HttpClient)


  constructor() { }

  registerUser(user: UserRegisterRequest): Observable<any> {

    return this.httpClient.post<any>(`${this.baseUrl}/auth/register`, user)
  }

  loginUser(user: UserLogin): Observable<UserResponse> {

    return this.httpClient.post<UserResponse>(`${this.baseUrl}/login`, user)
  }

}
