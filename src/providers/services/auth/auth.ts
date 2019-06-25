import { authAPI } from '@/providers/apis/auth/auth';
import { sessionService } from '@/providers/services/auth/session';

export class AuthService {
  private static INSTANCE = new AuthService();

  static get instance() {
    return this.INSTANCE;
  }

  public doAuthentication() {
    const sessionModel = sessionService.getSession();
    if (!sessionModel) {
      authAPI.signInAsAnonymous().subscribe((session) => {
        sessionService.setSession(session);
      });
    }
  }

}

export const authService = AuthService.instance;
