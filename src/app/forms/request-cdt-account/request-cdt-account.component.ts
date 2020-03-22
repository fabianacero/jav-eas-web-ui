import {Component, OnInit} from '@angular/core';
import {ZgwnuBonitaSession} from '@zgwnu/ng-bonita';
import {Utilities} from '../../utilities/utilities';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-request-cdt-account',
  templateUrl: './request-cdt-account.component.html',
  styleUrls: ['./request-cdt-account.component.scss']
})
export class RequestCdtAccountComponent implements OnInit {

  public session: ZgwnuBonitaSession;
  public showRate = true;

  constructor(private utilities: Utilities) {
  }

  ngOnInit(): void {
    this.session = this.utilities.getFromSession('session');
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return false;
    }
    const docuement = form.value.document;
    console.log('form, ', form);
  }
}
