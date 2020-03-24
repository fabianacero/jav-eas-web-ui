import {Component, OnInit} from '@angular/core';
import {BonitaSession} from "../../models/bonita-session";
import {Utilities} from "../../utilities/utilities";

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {

  public session: BonitaSession;

  constructor(private utilities: Utilities) {
  }

  ngOnInit(): void {
    this.session = this.utilities.getFromSession('session');
  }

}
