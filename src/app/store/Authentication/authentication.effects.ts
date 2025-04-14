import { Injectable, Inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, exhaustMap, tap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { AuthenticationService } from '../../core/services/auth.service';
import { login, loginSuccess, loginFailure, logout, logoutSuccess, RegisterAction, RegisterSuccess, RegisterFailure } from './authentication.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationEffects {

  Register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegisterAction),
      exhaustMap(({ firstName, lastName, email, password, phoneNumber, roles }) =>
        this.AuthenticationService.register(firstName, lastName, email, password, phoneNumber, roles).pipe(
          map((user) => {
            this.router.navigate(['/auth/login']);
            return RegisterSuccess({ user });
          }),
          catchError((error) => {
            console.error('Registration error details:', error.message);
            return of(RegisterFailure({ error: error.message || 'Registration failed' }));
          })
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      exhaustMap(({ email, password }) =>
        this.AuthenticationService.login(email, password).pipe(
          map((user) => {
            if (user.status == 'success') {
              localStorage.setItem('currentUser', JSON.stringify(user.data));
              localStorage.setItem('token', user.token);
              this.router.navigate(['/']);
            }
            return loginSuccess({ user });
          }),
          catchError((error) => of(loginFailure({ error })))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      tap(() => {
        // Perform any necessary cleanup or side effects before logging out
      }),
      exhaustMap(() => of(logoutSuccess()))
    )
  );

  constructor(
    @Inject(Actions) private actions$: Actions,
    private AuthenticationService: AuthenticationService,
    private router: Router) {
  }

}
