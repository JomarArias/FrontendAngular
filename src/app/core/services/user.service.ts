import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api/users/';

  constructor(private http: HttpClient) { }
   
  saveUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  
  delateUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}`);
  }

  toggleUserStatus(id: number, is_active: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${id}/toggle_status/`, {});
  }
}
