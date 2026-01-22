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
    const userData =
    {
      ...user,
      is_active: user.is_active ? 1 : 0
    };
    return this.http.post<any>(this.apiUrl, userData);
  } 

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  updateUser(id: number, user: any) : Observable<any> {
    const userData = {
      ...user,
      is_active: user.is_active ? 1 : 0
    };
    return this.http.put<any>(`${this.apiUrl}${id}/`, userData);
  }
  
  delateUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}`);
  }

toggleUserStatus(id: number, is_active: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}${id}/toggle_status/`, {
    is_active: is_active ? 1 : 0
  });
}

}
