import { Inject, Injectable, Optional } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuration } from '../../configuration';
import { BASE_PATH, COLLECTION_FORMATS, GHN_TOKEN } from '../../variable';
import { CustomHttpUrlEncodingCodec } from '../../encoder';

@Injectable({
  providedIn: 'root',
})
export class GhnLocationService {
  protected basePath =
    'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data';
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
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiProvincesGet(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>;
  public apiProvincesGet(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public apiProvincesGet(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public apiProvincesGet(
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let headers = this.defaultHeaders;
    // to determine the Accept header
    headers = headers.set('Token', `${GHN_TOKEN}`);

    // to determine the Content-Type header
    const consumes: string[] = ['application/json'];
    const httpContentTypeSelected: string | undefined =
      this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<any>('get', `${this.basePath}/province`, {
      headers: headers,
      withCredentials: this.configuration.withCredentials,
      observe: observe,
      reportProgress: reportProgress,
    });
  }

  /**
   *
   * @param provinceId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiDistrictsGet(
    provinceId: number,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>;
  public apiDistrictsGet(
    provinceId: number,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public apiDistrictsGet(
    provinceId: number,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public apiDistrictsGet(
    provinceId: number,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let headers = this.defaultHeaders;
    let params = new HttpParams();

    if (provinceId === null || provinceId === undefined) {
      throw new Error(
        'Required parameter provinceId was null or undefined when calling apiDistrictsGet.'
      );
    } else {
      params = params.set('province_id', provinceId);
    }

    // to determine the Accept header
    headers = headers.set('Token', `${GHN_TOKEN}`);

    // to determine the Content-Type header
    const consumes: string[] = ['application/json'];
    const httpContentTypeSelected: string | undefined =
      this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<any>('get', `${this.basePath}/district`, {
      headers: headers,
      params: params,
      withCredentials: this.configuration.withCredentials,
      observe: observe,
      reportProgress: reportProgress,
    });
  }

  /**
   *
   * @param districtId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiWardsGet(
    districtId: number,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>;
  public apiWardsGet(
    districtId: number,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public apiWardsGet(
    districtId: number,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public apiWardsGet(
    districtId: number,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let headers = this.defaultHeaders;
    let params = new HttpParams();

    if (districtId === null || districtId === undefined) {
      throw new Error(
        'Required parameter districtId was null or undefined when calling apiWardsGet.'
      );
    } else {
      params = params.set('district_id', districtId);
    }

    // to determine the Accept header
    headers = headers.set('Token', `${GHN_TOKEN}`);

    // to determine the Content-Type header
    const consumes: string[] = ['application/json'];
    const httpContentTypeSelected: string | undefined =
      this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<any>('get', `${this.basePath}/ward`, {
      headers: headers,
      params: params,
      withCredentials: this.configuration.withCredentials,
      observe: observe,
      reportProgress: reportProgress,
    });
  }
}
