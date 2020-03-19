import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {LoginService} from "../../provider/login.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {
  }

  canActivate() {
    if (this.loginService.isLogged()) {
      this.router.navigate(['/task']);
    }
    return !this.loginService.isLogged();
  }

}
