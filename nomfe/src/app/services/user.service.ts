import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from '../configuration';
import { BASE_PATH, API_ROOT_URL } from '../variable';

@Injectable({
  providedIn: 'root',
})
export class UserService {
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
   * @param body
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiUserChangePasswordPost(
    accessToken: string,
    body?: any,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>;
  public apiUserChangePasswordPost(
    accessToken: string,
    body?: any,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public apiUserChangePasswordPost(
    accessToken: string,
    body?: any,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public apiUserChangePasswordPost(
    accessToken: string,
    body?: any,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (accessToken === null || accessToken === undefined) {
      throw new Error(
        'Required parameter accessToken was null or undefined when calling apiUserPatch.'
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
      'post',
      `${this.basePath}/users/change_password/`,
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

  /**
   * @param accessToken
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiSendVerifiedCodeToEmailGet(
    accessToken: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>;
  public apiSendVerifiedCodeToEmailGet(
    accessToken: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public apiSendVerifiedCodeToEmailGet(
    accessToken: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public apiSendVerifiedCodeToEmailGet(
    accessToken: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (accessToken === null || accessToken === undefined) {
      throw new Error(
        'Required parameter accessToken was null or undefined when calling apiSendVerifiedCodeToEmailGet.'
      );
    }

    let headers = this.defaultHeaders;
    // to determine the Accept header
    headers = headers.set('Authorization', `Bearer ${accessToken}`);

    return this.httpClient.request<any>(
      'get',
      `${this.basePath}/users/send-verified-code-to-email/`,
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
  public apiSendVerifiedCodeToPhoneGet(
    accessToken: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>;
  public apiSendVerifiedCodeToPhoneGet(
    accessToken: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public apiSendVerifiedCodeToPhoneGet(
    accessToken: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public apiSendVerifiedCodeToPhoneGet(
    accessToken: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (accessToken === null || accessToken === undefined) {
      throw new Error(
        'Required parameter accessToken was null or undefined when calling apiSendVerifiedCodeToEmailGet.'
      );
    }

    let headers = this.defaultHeaders;
    // to determine the Accept header
    headers = headers.set('Authorization', `Bearer ${accessToken}`);

    return this.httpClient.request<any>(
      'get',
      `${this.basePath}/users/send-verified-code-to-phone-number/`,
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
  public apiCheckVerifiedCodeToPhonePost(
    accessToken: string,
    body?: any,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>;
  public apiCheckVerifiedCodeToPhonePost(
    accessToken: string,
    body?: any,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public apiCheckVerifiedCodeToPhonePost(
    accessToken: string,
    body?: any,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public apiCheckVerifiedCodeToPhonePost(
    accessToken: string,
    body?: any,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (accessToken === null || accessToken === undefined) {
      throw new Error(
        'Required parameter accessToken was null or undefined when calling apiCheckVerifiedCodeToPhonePost.'
      );
    }

    let headers = this.defaultHeaders;
    // to determine the Accept header
    headers = headers.set('Authorization', `Bearer ${accessToken}`);

    return this.httpClient.request<any>(
      'post',
      `${this.basePath}/users/check-verified-code-to-phone-number/`,
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
  public apiCheckVerifiedCodeToEmailPost(
    accessToken: string,
    body?: any,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>;
  public apiCheckVerifiedCodeToEmailPost(
    accessToken: string,
    body?: any,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public apiCheckVerifiedCodeToEmailPost(
    accessToken: string,
    body?: any,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public apiCheckVerifiedCodeToEmailPost(
    accessToken: string,
    body?: any,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (accessToken === null || accessToken === undefined) {
      throw new Error(
        'Required parameter accessToken was null or undefined when calling apiCheckVerifiedCodeToEmailPost.'
      );
    }

    let headers = this.defaultHeaders;
    // to determine the Accept header
    headers = headers.set('Authorization', `Bearer ${accessToken}`);

    return this.httpClient.request<any>(
      'post',
      `${this.basePath}/users/check-verified-code-to-email/`,
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
  public apiGetUserWithIdEmailPost(
    body?: any,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>;
  public apiGetUserWithIdEmailPost(
    body?: any,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public apiGetUserWithIdEmailPost(
    body?: any,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public apiGetUserWithIdEmailPost(
    body?: any,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let headers = this.defaultHeaders;

    return this.httpClient.request<any>(
      'post',
      `${this.basePath}/users/get-user-id-with-email/`,
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
  public apiSendResetCodeToEmailGet(
    userId?: number,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>;
  public apiSendResetCodeToEmailGet(
    userId?: number,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public apiSendResetCodeToEmailGet(
    userId?: number,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public apiSendResetCodeToEmailGet(
    userId?: number,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (userId === null || userId === undefined) {
      throw new Error(
        'Required parameter userId was null or undefined when calling apiSendResetCodeToEmailGet.'
      );
    }
    let headers = this.defaultHeaders;

    return this.httpClient.request<any>(
      'get',
      `${this.basePath}/users/${userId}/send-reset-code-to-email/`,
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
  public apiGetTokenByUserIdAndResetCodePost(
    body?: any,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>;
  public apiGetTokenByUserIdAndResetCodePost(
    body?: any,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public apiGetTokenByUserIdAndResetCodePost(
    body?: any,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public apiGetTokenByUserIdAndResetCodePost(
    body?: any,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let headers = this.defaultHeaders;

    return this.httpClient.request<any>(
      'post',
      `${this.basePath}/users/get-token-by-user-id-and-reset-code/`,
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
  public apiResetPasswordPost(
    accessToken: string,
    body?: any,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>;
  public apiResetPasswordPost(
    accessToken: string,
    body?: any,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public apiResetPasswordPost(
    accessToken: string,
    body?: any,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public apiResetPasswordPost(
    accessToken: string,
    body?: any,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (accessToken === null || accessToken === undefined) {
      throw new Error(
        'Required parameter accessToken was null or undefined when calling apiResetPasswordPost.'
      );
    }
    let headers = this.defaultHeaders;
    // to determine the Accept header
    headers = headers.set('Authorization', `Bearer ${accessToken}`);

    return this.httpClient.request<any>(
      'post',
      `${this.basePath}/users/reset-password/`,
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
  public apiChangeAvatarPatch(
    accessToken: string,
    body?: any,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>;
  public apiChangeAvatarPatch(
    accessToken: string,
    body?: any,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public apiChangeAvatarPatch(
    accessToken: string,
    body?: any,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public apiChangeAvatarPatch(
    accessToken: string,
    body?: any,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (accessToken === null || accessToken === undefined) {
      throw new Error(
        'Required parameter accessToken was null or undefined when calling apiResetPasswordPost.'
      );
    }
    let headers = this.defaultHeaders;
    // to determine the Accept header
    headers = headers.set('Authorization', `Bearer ${accessToken}`);

    return this.httpClient.request<any>(
      'patch',
      `${this.basePath}/users/change-avatar/`,
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
  public apiProductsOfUserGet(
    accessToken: string,
    userId: number,
    body?: any,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>;
  public apiProductsOfUserGet(
    accessToken: string,
    userId: number,
    body?: any,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public apiProductsOfUserGet(
    accessToken: string,
    userId: number,
    body?: any,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public apiProductsOfUserGet(
    accessToken: string,
    userId: number,
    body?: any,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (accessToken === null || accessToken === undefined) {
      throw new Error(
        'Required parameter accessToken was null or undefined when calling apiResetPasswordPost.'
      );
    }
    if (userId === null || userId === undefined) {
      throw new Error(
        'Required parameter userId was null or undefined when calling apiProductsOfUserGet.'
      );
    }

    let headers = this.defaultHeaders;
    // to determine the Accept header
    headers = headers.set('Authorization', `Bearer ${accessToken}`);

    return this.httpClient.request<any>(
      'get',
      `${this.basePath}/users/${userId}/products/`,
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
