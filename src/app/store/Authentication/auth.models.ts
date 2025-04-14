export class User {
  status?:string;
  token?:string;
  data:any;
}

export interface Register {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  roles: [string];
}
