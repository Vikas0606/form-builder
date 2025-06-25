import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }


  login(email: string, password: string): Observable<User[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users?email=${email}&password=${password}`).pipe(
      tap(users => {
        console.log(users);
      })
    );
  }
  
  setUser(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  
  getUser() {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }

  getRole() {
    const user = this.getUser();
    return user?.role || null;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

}
