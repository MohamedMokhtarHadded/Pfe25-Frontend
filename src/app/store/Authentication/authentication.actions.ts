import { createAction, props } from '@ngrx/store';
import { User, Register } from './auth.models';

// Register action
export const RegisterAction = createAction(
  '[Authentication] Register',
  props<Register>()
);
// revert back any to User
export const RegisterSuccess = createAction('[Authentication] Register Success', props<{ user: any }>());
export const RegisterFailure = createAction('[Authentication] Register Failure', props<{ error: string }>());

// login action
export const login = createAction('[Authentication] Login', props<{ email: string, password: string }>());
export const loginSuccess = createAction('[Authentication] Login Success', props<{ user: any }>());
export const loginFailure = createAction('[Authentication] Login Failure', props<{ error: string }>());

// logout action
export const logout = createAction('[Authentication] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');


