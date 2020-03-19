import { Component, OnInit } from '@angular/core';
import {ZgwnuBonitaSession} from '@zgwnu/ng-bonita';
import {Utilities} from '../../utilities/utilities';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  public session: ZgwnuBonitaSession;

  constructor(private utilities: Utilities) { }

  ngOnInit(): void {
    this.session =  this.utilities.getFromSession("session");
    console.log('session, ', this.session);
  }

}
