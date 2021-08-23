import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable,of } from 'rxjs';
import { take,map } from 'rxjs/operators';
import { FirebaseauthService } from '../services/firebaseauth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    public afAuth: AngularFireAuth,
    public firebaseAuthService:FirebaseauthService,
    private router: Router
    ){
      console.log('estas en el auth guard')
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.firebaseAuthService.getCredentials()

   

  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      return this.firebaseAuthService.getCredentials()
      
  }

}
