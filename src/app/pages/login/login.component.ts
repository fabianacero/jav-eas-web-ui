import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Utilities} from 'src/app/utilities/utilities';
import {Router} from '@angular/router';
import {LoginService} from '../../provider/login.service';
import {ServiceResponse} from '../../enums/service-response.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
    this.login.loginUser(loginForm, (response: any) => {
      if (response.status === ServiceResponse.SUCESS) {
        this.router.navigate(['/start']);
      }
    });
  }
}
