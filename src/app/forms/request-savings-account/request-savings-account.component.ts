import {Component, OnInit} from '@angular/core';
import {ZgwnuBonitaSession} from "@zgwnu/ng-bonita";
import {Utilities} from "../../utilities/utilities";
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-request-savings-account',
  templateUrl: './request-savings-account.component.html',
  styleUrls: ['./request-savings-account.component.scss']
})
export class RequestSavingsAccountComponent implements OnInit {

  public task: any;
  public session: ZgwnuBonitaSession;

  constructor(private utilities: Utilities,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.session = this.utilities.getFromSession('session');
    this.activatedRoute.paramMap.subscribe(params => {
      this.task = this.utilities.decodeJsonElement(params.get('task'));
    });
    /*
          this.businessDataService.getBusunessData('CDTConditions', (cdtConditions) => {
        this.model = this.utilities.recursiveAssign(new CdtRequest(), cdtConditions);
        this.model.accept = false;
      });
     */
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return false;
    }
    const docuement = form.value.document;
    console.log("form, ", form)
  }
}
