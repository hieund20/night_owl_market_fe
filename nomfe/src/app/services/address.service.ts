import { Inject, Injectable, Optional } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuration } from '../configuration';
import { BASE_PATH, COLLECTION_FORMATS } from '../variable';
import { CustomHttpUrlEncodingCodec } from '../encoder';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  protected basePath = 'https://night-owl-market.herokuapp.com/market';
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
   * @param status
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiAddressGet(
    accessToken: string,
    page?: number,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>;
  public apiAddressGet(
    accessToken: string,
    page?: number,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public apiAddressGet(
    accessToken: string,
    page?: number,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public apiAddressGet(
    accessToken: string,
    page?: number,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let queryParameters = new HttpParams({
      encoder: new CustomHttpUrlEncodingCodec(),
    });
    if (accessToken === null || accessToken === undefined) {
      throw new Error(
        'Required parameter accessToken was null or undefined when calling apiOrdersGet.'
      );
    }
    if (page !== null && page !== undefined) {
      queryParameters = queryParameters.set('page', <any>page);
    }

    let headers = this.defaultHeaders;
    // to determine the Accept header
    headers = headers.set('Authorization', `Bearer ${accessToken}`);

    // to determine the Content-Type header
    const consumes: string[] = ['application/json'];
    const httpContentTypeSelected: string | undefined =
      this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<any>('get', `${this.basePath}/address/`, {
      params: queryParameters,
      headers: headers,
      withCredentials: this.configuration.withCredentials,
      observe: observe,
      reportProgress: reportProgress,
    });
  }

  /**
   * @param body
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiAddressPost(
    accessToken: string,
    body?: any,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>;
  public apiAddressPost(
    accessToken: string,
    body?: any,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public apiAddressPost(
    accessToken: string,
    body?: any,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public apiAddressPost(
    accessToken: string,
    body?: any,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let queryParameters = new HttpParams({
      encoder: new CustomHttpUrlEncodingCodec(),
    });
    if (accessToken === null || accessToken === undefined) {
      throw new Error(
        'Required parameter accessToken was null or undefined when calling apiOrdersGet.'
      );
    }

    let headers = this.defaultHeaders;
    // to determine the Accept header
    headers = headers.set('Authorization', `Bearer ${accessToken}`);

    // to determine the Content-Type header
    const consumes: string[] = ['application/json'];
    const httpContentTypeSelected: string | undefined =
      this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<any>('post', `${this.basePath}/address/`, {
      headers: headers,
      body: body,
      withCredentials: this.configuration.withCredentials,
      observe: observe,
      reportProgress: reportProgress,
    });
  }
}
