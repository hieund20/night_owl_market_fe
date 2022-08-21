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
export class ProductService {
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
   *
   *
   * @param contractId
   * @param Filters
   * @param Sorts
   * @param Page
   * @param PageSize
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiProductGet(
    page?: number,
    category_id?: number,
    search?: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>;
  public apiProductGet(
    page?: number,
    category_id?: number,
    search?: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public apiProductGet(
    page?: number,
    category_id?: number,
    search?: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public apiProductGet(
    page?: number,
    category_id?: number,
    search?: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    // if (page === null || page === undefined) {
    //   throw new Error(
    //     'Required parameter page was null or undefined when calling apiProductGet.'
    //   );
    // }

    let queryParameters = new HttpParams({
      encoder: new CustomHttpUrlEncodingCodec(),
    });
    if (page !== undefined && page !== null) {
      queryParameters = queryParameters.set('page', <any>page);
    }
    if (category_id !== undefined && category_id !== null) {
      queryParameters = queryParameters.set('category_id', <any>category_id);
    }
    if (search !== undefined && search !== null) {
      queryParameters = queryParameters.set('search', <any>search);
    }

    let headers = this.defaultHeaders;
    // to determine the Accept header
    let httpHeaderAccepts: string[] = [];
    const httpHeaderAcceptSelected: string | undefined =
      this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    return this.httpClient.request<any>('get', `${this.basePath}/products/`, {
      params: queryParameters,
      headers: headers,
      withCredentials: this.configuration.withCredentials,
      observe: observe,
      reportProgress: reportProgress,
    });
  }

  /**
   *
   *
   * @param productId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiProductByIdGet(
    productId: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>;
  public apiProductByIdGet(
    productId: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public apiProductByIdGet(
    productId: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public apiProductByIdGet(
    productId: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (productId === null || productId === undefined) {
      throw new Error(
        'Required parameter productId was null or undefined when calling apiProductByIdGet.'
      );
    }

    // let queryParameters = new HttpParams({
    //   encoder: new CustomHttpUrlEncodingCodec(),
    // });
    // if (productId !== undefined && productId !== null) {
    //   queryParameters = queryParameters.set('', <any>productId);
    // }

    let headers = this.defaultHeaders;
    // to determine the Accept header
    let httpHeaderAccepts: string[] = [];
    const httpHeaderAcceptSelected: string | undefined =
      this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    return this.httpClient.request<any>(
      'get',
      `${this.basePath}/products/${productId}/`,
      {
        // params: queryParameters,
        headers: headers,
        withCredentials: this.configuration.withCredentials,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }
}
