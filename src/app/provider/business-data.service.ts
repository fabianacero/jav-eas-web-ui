import {Injectable} from '@angular/core';
import {ZgwnuBonitaSearchParms} from '@zgwnu/ng-bonita';
import {HttpMethod} from '../enums/http-method.enum';
import {HttpRequestService} from './http-request/http-request.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessDataService {

  constructor(private httpRequest: HttpRequestService) {
  }

  public getBusunessData(businessData, callback?) {
    let businessDataName = `com.company.model.${businessData}`;
    switch (businessData) {
      case 'CDTConditions':
        businessDataName += '/14';
        break;
      case 'Product':
        businessDataName += '/21';
        break;
      case 'Customer':
        businessDataName += '/24';
        break;
      case 'identificationCustomer':
        businessDataName = `com.company.model.Customer/24/identificationCustomer`;
        break;
      case 'RequestProduct':
        businessDataName += '/14';
        break;
    }

    const endpoint = `/bonita/API/bdm/businessData/${businessDataName}`;
    console.log("enpoint, ", endpoint);
    this.httpRequest.request(endpoint, {}, HttpMethod.GET)
      .subscribe((response) => {
        return typeof callback === 'function' ? callback(response) : '';
      });
  }
}
