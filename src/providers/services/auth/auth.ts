import { authAPI } from '@/providers/apis/auth/auth';
import { sessionService } from '@/providers/services/auth/session';
import { Events } from '@/events';

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
        Events.$emit('auth:initializeAuthCompleted', session);
      });
    }
  }

  public clearStorageAndDoAuthentication() {
    authAPI.signInAsAnonymous().subscribe((session) => {
      sessionService.deleteSession();
      Events.$emit('auth:reAuthenticateDone', session);
    });
  }

  public logout() {
    authAPI.signOut().subscribe(() => {
      this.clearStorageAndDoAuthentication();
    });
  }
}

export const authService = AuthService.instance;
