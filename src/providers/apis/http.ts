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

  public get(url: string, data?: any, headers?: any): Observable<any> {
    const options = {
      url: this.formURL(url),
      method: 'GET',
      headers,
      data,
    };
    return ajax(options).pipe(catchError(this.handleError));
  }


  public post(url: string, data?: any, headers?: any): Observable<any> {
    const options = {
      url: this.formURL(url),
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    };
    return ajax(options).pipe(catchError(this.handleError));
  }

  public put(url: string, params?: any, headers?: any): Observable<any> {
    const options = {
      url,
      method: 'PUT',
      headers,
      params,
    };
    return ajax(options).pipe(catchError(this.handleError));
  }

  public delete(url: string, params?: any, headers?: any): Observable<any> {
    const options = {
      url,
      method: 'DELETE',
      headers,
      params,
    };
    return ajax(options).pipe(catchError(this.handleError));
  }

  public getBasicHeaders(token: string) {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${window.btoa(token)}`,
    };
  }

  public getTokenHeaders() {
    const session: SessionModel | null = sessionService.getSession();
    if (session) {
      return {
        'Content-Type': 'application/json',
        'Authorization': `Token ${session.access_token}`,
      };
    }
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

export  const http = Http.instance;
