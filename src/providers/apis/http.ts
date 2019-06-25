import { fromEvent, Observable, Subscriber } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { SessionModel } from '@/models/auth/session';
import { sessionService } from '@/providers/services/auth/session';
import 'rxjs/add/observable/throw';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
export class Http {
  private static INSTANCE = new Http();

  static get instance() {
    return this.INSTANCE;
  }

  public get(url: string, headers?: any, data?: any): Observable<any> {
    const options = {
      url: this.formURL(url),
      method: 'GET',
      headers,
      data,
    };
    return ajax(options).pipe(catchError(this.handleError));
  }

  public post(url: string, headers?: any, data?: any): Observable<any> {
    const options = {
      url: this.formURL(url),
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    };
    return ajax(options).pipe(catchError(this.handleError));
  }

  public put(url: string, headers?: any, data?: any): Observable<any> {
    const options = {
      url: this.formURL(url),
      method: 'PUT',
      headers,
      data,
    };
    return ajax(options).pipe(catchError(this.handleError));
  }

  public delete(url: string, headers?: any, data?: any): Observable<any> {
    const options = {
      url: this.formURL(url),
      method: 'DELETE',
      headers,
      data,
    };
    return ajax(options).pipe(catchError(this.handleError));
  }

  public getBasicHeaders(token: string) {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${window.btoa(token)}`,
    };
  }

  public getTokenHeaders(token?: string) {
    if (!token) {
      const session: SessionModel | null = sessionService.getSession();
      if (session) {
        token = session.access_token;
      }
    }
    return {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,
    };
  }

  private formURL(url: string) {
    if (process.env.VUE_APP_API_ENDPOINT && !url.includes('http')) {
      url = `${process.env.VUE_APP_API_ENDPOINT}/${url}`;
    }
    return url;
  }

  private handleError(error: Response | any) {
    return Observable.throw(error);
  }
}

export const http = Http.instance;
