import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, retry, catchError, timeout} from 'rxjs/operators';
import {HttpMethod} from '../../enums/http-method.enum';

const REQUEST_TIMEOUT = 30000;

@Injectable()
export class HttpRequestService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
      Allow: 'GET, POST, OPTIONS, PUT, DELETE'
    }),
    withCredentials: true
  };

  private observeAllResponse = {observe: 'response'};

  constructor(private http: HttpClient) {
  }

  request(url: string, params: any, method: string = HttpMethod.POST, aditionalOptions?: { additionalHeaders: { Cookie: string; 'bonita.tenant': string; 'X-Bonita-API-Token': string } }): Observable<any> {
    let options = {};
    const body = JSON.stringify(params);
    let result: Observable<any>;

    if (aditionalOptions) {
      if (aditionalOptions.additionalHeaders) {
        let aditionalHeaders = {};
        aditionalHeaders = aditionalOptions.additionalHeaders;
        let headerValue = '';
        let attrName = '';
        let newHeaders = new HttpHeaders();
        this.httpOptions.headers.keys().forEach(headerName => {
          headerValue = this.httpOptions.headers.get(headerName);
          newHeaders = newHeaders.append(`${headerName}`, headerValue);
        });
        Object.keys(aditionalHeaders).map((key) => {
          attrName = key.replace(/_/g, '-');
          newHeaders = newHeaders.append(`${attrName}`, aditionalHeaders[key]);
        });
        options = {headers: newHeaders};
      } else {
        options = this.httpOptions;
        // options = {...options, ...aditionalOptions};
      }
    }

    if (method === HttpMethod.POST) {
      result = this.http.post(url, body, options);
    }
    if (method === HttpMethod.GET) {
      console.log('options, ', options);
      result = this.http.get(url + this.listParams(params), options);
    }
    if (method === HttpMethod.PUT) {
      result = this.http.put(url, body, options);
    }

    return result.pipe(
      retry(1),
      timeout(REQUEST_TIMEOUT),
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  requestAsync(url: string, params: any, method: string = HttpMethod.POST, aditionalHeaders?: { [key: string]: string }): Promise<any> {
    let finalHeaders = this.httpOptions;
    const body = JSON.stringify(params);
    let result: Observable<any>;

    if (aditionalHeaders) {
      const tempHeader = {...this.httpOptions.headers, ...aditionalHeaders};
      finalHeaders = {headers: new HttpHeaders(tempHeader), withCredentials: true};
    }

    if (method === HttpMethod.POST) {
      result = this.http.post(url, body, finalHeaders);
    }
    if (method === HttpMethod.GET) {
      result = this.http.get(url + this.listParams(params), finalHeaders);
    }
    if (method === HttpMethod.PUT) {
      result = this.http.put(url, body, finalHeaders);
    }

    return result.pipe(
      retry(1),
      timeout(REQUEST_TIMEOUT),
      map(this.extractData),
      catchError(this.handleError)
    ).toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(response: Response) {
    return response;
  }

  private handleError(error: any) {
    return Observable.create(observer => {
      observer.error(error);
      observer.complete();
    });
  }

  private listParams(data): string {
    if (data === '') {
      return '';
    } else {
      return Object.keys(data).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&');
    }
  }
};
