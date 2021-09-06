export interface Signin {
  username: string;
  password: string;
}

export interface Signup {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  avatarImage?: string;
  role?: string[];
}
