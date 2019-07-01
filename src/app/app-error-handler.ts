import router from '@/routers/router';
import { authAPI } from '@/providers/apis/auth/auth';
import { sessionService } from '@/providers/services/auth/session';
import axios from 'axios';

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  const currentRoute = router.currentRoute;
  if (error.response.status === 401 && router.currentRoute.name !== 'login') {
    const redirect = `/login?redirect=${router.currentRoute.path}`;
    sessionService.deleteSession();
    router.push(redirect);
  }
  return Promise.reject(error);
});
