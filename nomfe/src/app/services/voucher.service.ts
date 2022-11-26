import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from '../configuration';
import { API_ROOT_URL, BASE_PATH } from '../variable';

@Injectable({
  providedIn: 'root',
})
export class VoucherService {
  protected basePath = API_ROOT_URL;
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(
    protected httpClient: HttpClient,
    @Optional() configuration: Configuration,
    @Optional() @Inject(BASE_PATH) basePath: string
  ) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
      this.basePath = basePath || configuration.basePath || this.basePath;
    }
  }

  /**
   *
   *
   * @param accessToken
   * @param body
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiVouchersGet(
    accessToken: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>;
  public apiVouchersGet(
    accessToken: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public apiVouchersGet(
    accessToken: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public apiVouchersGet(
    accessToken: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (accessToken === null || accessToken === undefined) {
      throw new Error(
        'Required parameter accessToken was null or undefined when calling apiProductPost.'
      );
    }

    let headers = this.defaultHeaders;
    // to determine the Accept header
    headers = headers.set('Authorization', `Bearer ${accessToken}`);

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [];
    const httpHeaderAcceptSelected: string | undefined =
      this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    return this.httpClient.request<any>('get', `${this.basePath}/voucher/`, {
      headers: headers,
      withCredentials: this.configuration.withCredentials,
      observe: observe,
      reportProgress: reportProgress,
    });
  }
}
