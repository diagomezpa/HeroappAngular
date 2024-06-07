import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { Observable, tap } from 'rxjs';
import { environments } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) {}

  get currentUser(): User | undefined {
    if (!this.user) return undefined;

    return structuredClone(this.user); // structuredclone crea un clo ya que no se puede pasar por referencia
  }

  login(email: string, password: string): Observable<User> {
    // http.post('login',{ email, password });
    return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap((user) => (this.user = user)),
      tap((user) =>
        localStorage.setItem('token', 'aASDgjhasda.asdasd.aadsf123k')
      )
    );
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }
}
