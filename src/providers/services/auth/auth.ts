import { authAPI } from '@/providers/apis/auth/auth';
import { sessionService } from '@/providers/services/auth/session';
import router from '@/routers/router';

export class AuthService {
  private static INSTANCE = new AuthService();

  static get instance() {
    return this.INSTANCE;
  }

  public checkAuthentication() {
    const sessionModel = sessionService.getSession();
    if (sessionModel === null) {
      router.push('/login');
    }
  }

}

export const authService = AuthService.instance;
