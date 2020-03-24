import {Component, OnInit} from '@angular/core';
import {BonitaSession} from "../../models/bonita-session";
import {Utilities} from "../../utilities/utilities";
import {Router} from "@angular/router";

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {

  public session: BonitaSession;
  public request: any;
  public amount: string;

  constructor(private utilities: Utilities,
              private router: Router) {
  }

  ngOnInit(): void {
    this.session = this.utilities.getFromSession('session');
    this.request = this.utilities.getFromSession('request');
    this.amount = this.request.amount.toLocaleString();
  }

  public closeSession() {
    sessionStorage.removeItem('session');
    this.router.navigate(['/']);
  }

}
