import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { CommonService } from '../services/common-service';

export const childAuthGuard: CanActivateChildFn = async (childRoute, state) => {
  const commonService = inject(CommonService);
  const router = inject(Router);

  const isLoggedIn = await commonService.checkLoginStatus();

  if (isLoggedIn) {
    console.log("user is logged in");
  } else {
    console.log("user is not logged in");
  }

  console.log(childRoute, state);

  const url = state.url;
  const firstEndpoint = url.split('/').filter(Boolean)[0]; // extracts "dashboard" from "/dashboard/stats"

  switch (firstEndpoint) {
    case 'login':
      console.log('Navigating to Login');
      return !isLoggedIn;
      break;
    case 'dashboard':
      console.log('Navigating to dashboard');
      return isLoggedIn;
      break;
    default:
      console.log('Unknown route');
      break;
  }

  return isLoggedIn;
};
