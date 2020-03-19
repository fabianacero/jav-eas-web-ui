import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {
  ZgwnuBonitaErrorResponse,
  ZgwnuBonitaSession
} from '@zgwnu/ng-bonita';
import {Utilities} from 'src/app/utilities/utilities';
import {Router} from '@angular/router';
import {LoginService} from '../../provider/login.service';
import {ServiceResponse} from "../../enums/service-response.enum";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private session: ZgwnuBonitaSession;
  private errorResponse: ZgwnuBonitaErrorResponse;

  constructor(
    private router: Router,
    private utilities: Utilities,
    private login: LoginService) {
  }

  ngOnInit(): void {
  }

  onSubmit(loginForm: NgForm) {
    if (!loginForm.valid) {
      return false;
    }
    this.login.loginUser(loginForm, (response) => {
      if (response.status === ServiceResponse.SUCESS) {
        this.router.navigate(['/task']);
      }
    });
  }
}
