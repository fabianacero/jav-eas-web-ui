import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {HttpMethod} from "../../enums/http-method.enum";
import {HttpRequestService} from "../../provider/http-request/http-request.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  public showBackButton = false;
  @Input()
  public showCloseButton = false;
  @Input()
  public headerInfo: any;


  constructor(private router: Router, private _location: Location, private httpRequest: HttpRequestService) {
  }

  ngOnInit(): void {
  }

  public closeSession(): void {
    sessionStorage.removeItem('session');
    this.router.navigate(['/']);
  }

  public goBack(): void {
    this._location.back();
  }

  // get variable http://localhost:8080/bonita/API/bpm/activityVariable/20029/identificationNumber
  // update variable http://localhost:8080/bonita/API/bpm/caseVariable/1008/identificationNumber
  private getCaseVariable(taskId: number): void {
    const endpoint = `/bonita/API/bpm/activityVariable/${taskId}/identificationNumber`;
    const params = {};
    this.httpRequest.request(endpoint, params, HttpMethod.GET).subscribe((response) => {
      console.log('response, ', response);
    });
  }
}
