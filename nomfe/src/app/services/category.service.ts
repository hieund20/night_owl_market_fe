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
import { BASE_PATH, COLLECTION_FORMATS, API_ROOT_URL } from '../variable';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
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
   * @param contractId
   * @param Filters
   * @param Sorts
   * @param Page
   * @param PageSize
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiCategoryGet(
    Filters?: string,
    Sorts?: string,
    Page?: number,
    PageSize?: number,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>;
  public apiCategoryGet(
    Filters?: string,
    Sorts?: string,
    Page?: number,
    PageSize?: number,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public apiCategoryGet(
    Filters?: string,
    Sorts?: string,
    Page?: number,
    PageSize?: number,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public apiCategoryGet(
    Filters?: string,
    Sorts?: string,
    Page?: number,
    PageSize?: number,
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

    return this.httpClient.request<any>(
      'get',
      `${this.basePath}/category/?format=json`,
      {
        headers: headers,
        withCredentials: this.configuration.withCredentials,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }
}
