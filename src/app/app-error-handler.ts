import { Events } from '@/events';
import router from '@/routers/router';
import { authAPI } from '@/providers/apis/auth/auth';
import { sessionService } from '@/providers/services/auth/session';

Events.$on('events.ajax.request.error', (error: any) => {
  const currentRoute = router.currentRoute;
  if (error.status === 401 && router.currentRoute.name !== 'login') {
    const redirect = `/login?redirect=${router.currentRoute.path}`;
    authAPI.signInAsAnonymous().subscribe((session) => {
      sessionService.setSession(session);
      router.push(redirect);
    });
  }
});
