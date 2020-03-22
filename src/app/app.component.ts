import { Component } from '@angular/core';
import {
  ZgwnuBonitaSession
} from '@zgwnu/ng-bonita';
import {Utilities} from './utilities/utilities';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jav-eas-web-ui';
  public session: ZgwnuBonitaSession;

  constructor(private utilities: Utilities) {
    this.session = this.utilities.getFromSession('session');
    console.log('this.session, ', this.session);
  }
}




