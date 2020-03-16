import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {
  ZgwnuBonitaAuthenticationService, ZgwnuBonitaConfigService,
  ZgwnuBonitaCredentials,
  ZgwnuBonitaErrorResponse,
  ZgwnuBonitaSession
} from "@zgwnu/ng-bonita";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private session: ZgwnuBonitaSession;
  private errorResponse: ZgwnuBonitaErrorResponse;

  constructor(
    private authenticationService: ZgwnuBonitaAuthenticationService,
    private configService: ZgwnuBonitaConfigService,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(loginForm: NgForm) {
    if (!loginForm.valid) {
      return false;
    }
    this.authenticationService.login(new ZgwnuBonitaCredentials(loginForm.value.user, loginForm.value.password))
      .subscribe(
        session => {
          this.session = session;
          if (this.session) {
            this.router.navigate(["/task"]);
          }
        },
        errorResponse => {
          console.log(errorResponse);
          this.errorResponse = errorResponse;
        },
        () => {
          console.log('configService', this.configService);
        }
      );
  }
}
