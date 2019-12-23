import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Api } from '../services/api.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private api: Api, private router: Router) { }
  private isAuthenticated: boolean = false;

  canActivate() {
    if(this.loggedIn()) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
      this.router.navigate(['/login']);
    }
    
    return this.isAuthenticated;
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }
}