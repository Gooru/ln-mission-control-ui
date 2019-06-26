import { SessionModel } from '@/models/auth/session';
import { authSerializer } from '@/providers/serializers/auth/auth';

export class SessionService {

  private static INSTANCE = new SessionService();

  static get instance() {
    return this.INSTANCE;
  }

  private SESSION: string = 'MC_SESSION';


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
  }

  public deleteSession() {
    localStorage.removeItem(this.SESSION);
  }

  public isAuthorized() {
    const session = this.getSession();
    return (session && session.access_token);
  }
}

export const sessionService = SessionService.instance;
