import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { CommonService } from '../services/common-service';

export const childAuthGuard: CanActivateChildFn = async (childRoute, state) => {
  const commonService = inject(CommonService);
  const router = inject(Router);

  const isLoggedIn = await commonService.checkLoginStatus();

  const url = state.url;
  const firstEndpoint = url.split('/').filter(Boolean)[0]; // extracts "dashboard" from "/dashboard/stats"

  switch (firstEndpoint) {
    case "login":
      if (isLoggedIn) {
        router.navigate(['/dashboard']);
      }
      return !isLoggedIn;
      break;
    case "register":
      if (isLoggedIn) {
        router.navigate(['/dashboard']);
      }
      return !isLoggedIn;
      break;
    case "dashboard":
      if (!isLoggedIn) {
        router.navigate(['/login']);
      }
      return isLoggedIn;
      break;
    case "blog":
      if (!isLoggedIn) {
        router.navigate(['/login']);
      }
      return isLoggedIn;
      break;
    case "profile":
      if (!isLoggedIn) {
        router.navigate(['/login']);
      }
      return isLoggedIn;  
      break;
    default:
      // Handle unknown routes
      router.navigate(['/dashboard']);
      console.log("Unknown route");
      return false;
      break;
  }

  return isLoggedIn;
};
