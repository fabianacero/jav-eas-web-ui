import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ZgwnuBonitaSession} from "@zgwnu/ng-bonita";
import {Utilities} from "../../utilities/utilities";

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  public session: ZgwnuBonitaSession;

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
    console.log("form, ", form)


  }

}
