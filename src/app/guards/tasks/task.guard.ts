import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Utilities} from "../../utilities/utilities";
import {TasksNames} from "../../enums/tasks-names.enum";
import {Routes} from "../../enums/routes.enum";

@Injectable({
  providedIn: 'root'
})
export class TaskGuard implements CanActivate {

  constructor(private router: Router,
              private utilities: Utilities) {
  }

  canActivate() {
    const fistTask = this.utilities.getFromSession("begin");
    if (fistTask && fistTask[0]) {
      if (fistTask[0].name === TasksNames.LOGIN_TASK) {
        return true;
      }
    }
    this.router.navigate([Routes.TASK]);
  }
}
