import {Injectable} from '@angular/core';
import {
  ZgwnuBonitaAuthenticationService, ZgwnuBonitaConfigService,
  ZgwnuBonitaCredentials
} from '@zgwnu/ng-bonita';
import {Utilities} from 'src/app/utilities/utilities';
import {ServiceResponse} from '../enums/service-response.enum';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private configService: ZgwnuBonitaConfigService,
    private authenticationService: ZgwnuBonitaAuthenticationService,
    private utilities: Utilities) {
  }

  public loginUser(loginForm, callback) {
    this.authenticationService.login(new ZgwnuBonitaCredentials(loginForm.value.user, loginForm.value.password))
      .subscribe(
        session => {
          this.utilities.saveOnSession('session', session);
          return typeof callback === 'function' ? callback({status: ServiceResponse.SUCESS,  session}) : session;
        },
        errorResponse => {
          return typeof callback === 'function' ? callback({status: ServiceResponse.ERROR, message: errorResponse}) : errorResponse;
        },
        () => {
          console.log('configService', this.configService);
        }
      );
  }

  public isLogged() {
    return this.utilities.getFromSession('session') !== null;
  }
}
