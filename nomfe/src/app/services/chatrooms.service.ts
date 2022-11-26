import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from '../configuration';
import { CustomHttpUrlEncodingCodec } from '../encoder';
import { API_ROOT_URL, BASE_PATH } from '../variable';

@Injectable({
  providedIn: 'root',
})
export class ChatroomsService {
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
   * @param page
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiChatRoomsGet(
    accessToken: string,
    page?: number,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>;
  public apiChatRoomsGet(
    accessToken: string,
    page?: number,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public apiChatRoomsGet(
    accessToken: string,
    page?: number,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public apiChatRoomsGet(
    accessToken: string,
    page?: number,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (accessToken === null || accessToken === undefined) {
      throw new Error(
        'Required parameter accessToken was null or undefined when calling apiChatRoomsGet.'
      );
    }

    let queryParameters = new HttpParams({
      encoder: new CustomHttpUrlEncodingCodec(),
    });
    if (page !== undefined && page !== null) {
      queryParameters = queryParameters.set('page', <any>page);
    }

    let headers = this.defaultHeaders;
    // to determine the Accept header
    headers = headers.set('Authorization', `Bearer ${accessToken}`);

    return this.httpClient.request<any>('get', `${this.basePath}/chatrooms/`, {
      headers: headers,
      params: queryParameters,
      withCredentials: this.configuration.withCredentials,
      observe: observe,
      reportProgress: reportProgress,
    });
  }

  /**
   *
   *
   * @param accessToken
   * @param page
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiChatRoomsIdGet(
    accessToken: string,
    id: number,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>;
  public apiChatRoomsIdGet(
    accessToken: string,
    id: number,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public apiChatRoomsIdGet(
    accessToken: string,
    id: number,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public apiChatRoomsIdGet(
    accessToken: string,
    id: number,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (accessToken === null || accessToken === undefined) {
      throw new Error(
        'Required parameter accessToken was null or undefined when calling apiChatRoomsIdGet.'
      );
    }
    if (id === null || id === undefined) {
      throw new Error(
        'Required parameter accessToken was null or undefined when calling apiChatRoomsIdGet.'
      );
    }

    let headers = this.defaultHeaders;
    // to determine the Accept header
    headers = headers.set('Authorization', `Bearer ${accessToken}`);

    return this.httpClient.request<any>(
      'get',
      `${this.basePath}/chatrooms/${id}/`,
      {
        headers: headers,
        withCredentials: this.configuration.withCredentials,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   *
   *
   * @param accessToken
   * @param id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiChatRoomsSendMessagePost(
    accessToken: string,
    id: number,
    body?: any,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>;
  public apiChatRoomsSendMessagePost(
    accessToken: string,
    id: number,
    body?: any,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public apiChatRoomsSendMessagePost(
    accessToken: string,
    id: number,
    body?: any,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public apiChatRoomsSendMessagePost(
    accessToken: string,
    id: number,
    body?: any,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (accessToken === null || accessToken === undefined) {
      throw new Error(
        'Required parameter accessToken was null or undefined when calling apiChatRoomsIdGet.'
      );
    }
    if (id === null || id === undefined) {
      throw new Error(
        'Required parameter accessToken was null or undefined when calling apiChatRoomsIdGet.'
      );
    }

    let headers = this.defaultHeaders;
    // to determine the Accept header
    headers = headers.set('Authorization', `Bearer ${accessToken}`);

    return this.httpClient.request<any>(
      'post',
      `${this.basePath}/chatrooms/${id}/send-message/`,
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
