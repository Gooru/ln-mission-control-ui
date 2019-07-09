import { SessionModel } from '@/models/auth/session';
import { sessionService } from '@/providers/services/auth/session';
import { appConfigService } from '@/providers/services/app/app-config';
import axios from 'axios';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
export class Http {
  private static INSTANCE = new Http();

  static get instance() {
    return this.INSTANCE;
  }

  public get(url: string, headers?: any, params?: any) {
    const options = {
      url: this.formURL(url),
      method: 'GET',
      headers,
      params,
    };
    return axios(options);
  }

  public post(url: string, headers?: any, data?: any) {
    const options = {
      url: this.formURL(url),
      method: 'POST',
      headers,
      data: data ? JSON.stringify(data) : '{}',
    };
    return axios(options);
  }

  public put(url: string, headers?: any, data?: any) {
    const options = {
      url: this.formURL(url),
      method: 'PUT',
      headers,
      data,
    };
    return axios(options);
  }

  public delete(url: string, headers?: any, data?: any) {
    const options = {
      url: this.formURL(url),
      method: 'DELETE',
      headers,
      data,
    };
    return axios(options);
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
    const apiUrl = appConfigService.getApiUrl();
    if (apiUrl && !url.includes('http')) {
      url = `${apiUrl}/${url}`;
    }
    return url;
  }
}

export const http = Http.instance;
