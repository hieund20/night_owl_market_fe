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

@Injectable({
  providedIn: 'root',
})
export class UserService {
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
   * @param body
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiUserPost(
    body?: any,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>;
  public apiUserPost(
    body?: any,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public apiUserPost(
    body?: any,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public apiUserPost(
    body?: any,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let headers = this.defaultHeaders;
    // to determine the Accept header
    let httpHeaderAccepts: string[] = [];
    const httpHeaderAcceptSelected: string | undefined =
      this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
      'application/json',
      'text/json',
      'application/_*+json',
      'multipart/form-data',
    ];
    const httpContentTypeSelected: string | undefined =
      this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<any>('post', `${this.basePath}/users/`, {
      body: body,
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
  public apiUserPatch(
    accessToken: string,
    id: number,
    body?: any,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>;
  public apiUserPatch(
    accessToken: string,
    id: number,
    body?: any,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public apiUserPatch(
    accessToken: string,
    id: number,
    body?: any,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public apiUserPatch(
    accessToken: string,
    id: number,
    body?: any,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (accessToken === null || accessToken === undefined) {
      throw new Error(
        'Required parameter accessToken was null or undefined when calling apiUserPatch.'
      );
    }
    if (id === null || id === undefined) {
      throw new Error(
        'Required parameter id was null or undefined when calling apiUserPatch.'
      );
    }

    let headers = this.defaultHeaders;

    // to determine the Content-Type header
    const consumes: string[] = ['application/json'];
    const httpContentTypeSelected: string | undefined =
      this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    // to determine the Accept header
    headers = headers.set('Authorization', `Bearer ${accessToken}`);

    return this.httpClient.request<any>(
      'patch',
      `${this.basePath}/users/${id}/`,
      {
        body: body,
        headers: headers,
        withCredentials: this.configuration.withCredentials,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   * @param accessToken
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiCurrentUserGet(
    accessToken: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>;
  public apiCurrentUserGet(
    accessToken: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public apiCurrentUserGet(
    accessToken: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public apiCurrentUserGet(
    accessToken: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (accessToken === null || accessToken === undefined) {
      throw new Error(
        'Required parameter accessToken was null or undefined when calling apiCurrentUserGet.'
      );
    }

    let headers = this.defaultHeaders;
    // to determine the Accept header
    headers = headers.set('Authorization', `Bearer ${accessToken}`);

    return this.httpClient.request<any>(
      'get',
      `${this.basePath}/users/current-user/`,
      {
        headers: headers,
        withCredentials: this.configuration.withCredentials,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   * @param accessToken
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiCashingPost(
    accessToken: string,
    body: any,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>;
  public apiCashingPost(
    accessToken: string,
    body: any,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public apiCashingPost(
    accessToken: string,
    body: any,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public apiCashingPost(
    accessToken: string,
    body: any,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (accessToken === null || accessToken === undefined) {
      throw new Error(
        'Required parameter accessToken was null or undefined when calling apiCurrentUserGet.'
      );
    }

    let headers = this.defaultHeaders;
    // to determine the Accept header
    headers = headers.set('Authorization', `Bearer ${accessToken}`);

    return this.httpClient.request<any>(
      'post',
      `${this.basePath}/users/cashin/`,
      {
        headers: headers,
        body: body,
        withCredentials: this.configuration.withCredentials,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   * @param accessToken
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiLoginWithGooglePost(
    body: any,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>;
  public apiLoginWithGooglePost(
    body: any,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public apiLoginWithGooglePost(
    body: any,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public apiLoginWithGooglePost(
    body: any,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let headers = this.defaultHeaders;

    return this.httpClient.request<any>(
      'post',
      `${this.basePath}/users/login-with-google/`,
      {
        headers: headers,
        body: body,
        withCredentials: this.configuration.withCredentials,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }
}
