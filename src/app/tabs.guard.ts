import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './services/data.service';

@Injectable({
  providedIn: 'root',
})
export class TabsGuard implements CanActivate {
  constructor(public dataService: DataService, public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // return true;

    console.log('TABSGUARD USER ID', this.dataService.userID);

    if (localStorage.getItem('wobbUserID')) {
      console.log('auto login', console.log('TAB ROUTE', true));

      this.dataService.userID = localStorage.getItem('wobbUserID');
      console.log('TAB ROUTE', true);

      return true;
    }
    console.log('TAB ROUTE', false);
    return false;
    // if (this.dataService.userID === undefined) {
    //   this.router.navigate(['/login']);
    //   return false;
    // } else {
    //   return true;
    // }
  }
}
