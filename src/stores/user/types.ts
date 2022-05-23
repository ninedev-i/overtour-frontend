export interface UserState {
   email: string | null;
}

export interface AuthData {
   email: string;
   password: string;
   password_confirmation?: string;
}