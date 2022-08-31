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
export class CartService {
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
   * @param accessToken
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiCartGroupByOwnerGet(
    accessToken: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>;
  public apiCartGroupByOwnerGet(
    accessToken: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public apiCartGroupByOwnerGet(
    accessToken: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public apiCartGroupByOwnerGet(
    accessToken: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (accessToken === null || accessToken === undefined) {
      throw new Error(
        'Required parameter accessToken was null or undefined when calling apiOptionAddToCartPost.'
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

    return this.httpClient.request<any>('get', `${this.basePath}/cart/`, {
      headers: headers,
      withCredentials: this.configuration.withCredentials,
      observe: observe,
      reportProgress: reportProgress,
    });
  }

  /**
   * @param accessToken
   * @param id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiCartGroupByOwnerDelete(
    accessToken: string,
    id: number,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>;
  public apiCartGroupByOwnerDelete(
    accessToken: string,
    id: number,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public apiCartGroupByOwnerDelete(
    accessToken: string,
    id: number,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public apiCartGroupByOwnerDelete(
    accessToken: string,
    id: number,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (accessToken === null || accessToken === undefined) {
      throw new Error(
        'Required parameter accessToken was null or undefined when calling apiOptionAddToCartPost.'
      );
    }
    if (id === null || id === undefined) {
      throw new Error(
        'Required parameter id was null or undefined when calling apiCartGroupByOwnerDelete.'
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

    return this.httpClient.request<any>('delete', `${this.basePath}/cart/${id}`, {
      headers: headers,
      withCredentials: this.configuration.withCredentials,
      observe: observe,
      reportProgress: reportProgress,
    });
  }
}
