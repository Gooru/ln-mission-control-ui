import { SessionModel } from '@/models/auth/session';
import { authSerializer } from '@/providers/serializers/auth/auth';

export class SessionService {

  static get instance() {
    return this.INSTANCE;
  }

  private static INSTANCE = new SessionService();

  /**
   * Maintains the Demo user session copy
   */
  public DEMO_SESSION: string = 'MC_DEMO_SESSION';

  /**
   * Maintains the mission control session
   */
  private SESSION: string = 'MC_SESSION';

  /**
   * Maintains the demo user from RGO
   */
  private MC_UPDATE: string = 'MC_UPDATE_LOGIN';

  /**
   * Maintains the RGO mission control session.
   */
  private SESSION_RGO: string = 'ember_simple_auth-research-session';


  public getSession() {
    let session = null;
    const sessionAsString: string | null = localStorage.getItem(this.SESSION);
    if (sessionAsString) {
      const sessionAsJson = JSON.parse(sessionAsString);
      session = authSerializer.sessionModelSerializer(sessionAsJson);
    }
    return session;
  }

  public setSession(session: SessionModel) {
    localStorage.setItem(this.SESSION, JSON.stringify(session));
    localStorage.setItem(this.SESSION_RGO, JSON.stringify(authSerializer.sessionModelRGOSerializer(session)));
  }

  public setDemoSessionCopy() {
    const session: any = JSON.stringify(this.getSession());
    localStorage.setItem(this.DEMO_SESSION, session);
  }

  public getDemoSessionCopy() {
    const demoSession: any = localStorage.getItem(this.DEMO_SESSION);
    const session: any = JSON.parse(demoSession);
    return session;
  }

  public deleteSession() {
    localStorage.removeItem(this.SESSION);
    localStorage.removeItem(this.SESSION_RGO);
    localStorage.removeItem(this.DEMO_SESSION);
  }

  /**
   * We have to remove this logic when we moved all the page into vue js
   */
  public getMcUpdate() {
    const login: any = localStorage.getItem(this.MC_UPDATE);
    return JSON.parse(login);
  }

  public deleteMcUpdate() {
    localStorage.removeItem(this.MC_UPDATE);
  }

  public isAuthorized() {
    const session = this.getSession();
    return (session && session.access_token);
  }

  public getCdnUrl() {
    const service = this;
    const session = service.getSession();
    return session ? session.cdn_urls : null;
  }
}

export const sessionService = SessionService.instance;
