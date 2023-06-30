import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {TokenService} from "./token.service";

export class CheckLogout implements CanActivate{
  constructor(private tokenService: TokenService,
              private router: Router) {
  }

  // @ts-ignore
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   if(this.tokenService.getToken()){
     return true;
   } else {
     this.router.navigate([''])
   }
  }
  // @ts-ignore
  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   console.log('check token -->', this.tokenService.getToken())
  //   if (this.tokenService.getToken()){
  //     console.log('duoc dung component')
  //     return true;
  //   }else {
  //     this.router.navigate([''])
  //   }
  // }

}
