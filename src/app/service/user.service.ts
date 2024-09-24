import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserModel } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiURL = 'http://localhost:3000/user';

  constructor() {}
  httpClient = inject(HttpClient);
  getUsers(): Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(this.apiURL);
  }
  addUser(user: UserModel): Observable<UserModel> {
    return this.httpClient.post<UserModel>(this.apiURL, user);
  }
  updateUser(user: UserModel): Observable<UserModel> {
    return this.httpClient.put<UserModel>(`${this.apiURL}/${user.id}`, user);
  }
  deleteUser(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiURL}/${id}`);
  }
}
